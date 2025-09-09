import { useEffect, useState } from "react";
import BookCard from "./components/BookCard";
import Spinner from "./components/Spinner";
import Search from "./components/Search";
import { useDebounce } from "react-use";

const Home = () => {
  const subjects = [
    "fantasy",
    "science_fiction",
    "kids_books",
    "history",
    "programming",
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearchTerm, setdebounceSearchTerm] = useState("");

  const [isLoading, setisLoading] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");

  const [booksBySubject, setBooksBySubject] = useState({});

  useDebounce(() => setdebounceSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchBooks = async (query) => {
    setisLoading(true);
    seterrorMsg("");

    try {
      if (query && query.trim()) {
        // 🔎 Fetch search results
        console.log("Searching for:", query); // Debug log
        const endpoint = `https://openlibrary.org/search.json?q=${encodeURIComponent(
          query.trim()
        )}&limit=20`; // Add limit for better performance

        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(
            `Search failed: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Search response:", data); // Debug log

        if (!data.docs || data.docs.length === 0) {
          setBooksBySubject({ search: [] });
          seterrorMsg(`No books found for "${query}"`);
        } else {
          setBooksBySubject({ search: data.docs });
          seterrorMsg(""); // Clear any previous errors
        }
      } else {
        // 📚 Fetch subject-wise results
        console.log("Fetching subjects..."); // Debug log
        let result = {};
        const failedSubjects = [];

        for (let subject of subjects) {
          try {
            const endpoint = `https://openlibrary.org/subjects/${subject}.json?details=true&limit=10`;
            const response = await fetch(endpoint);

            if (!response.ok) {
              console.warn(`Failed to fetch ${subject}: ${response.status}`);
              failedSubjects.push(subject);
              continue;
            }

            const data = await response.json();
            result[subject] = data.works || [];

            // Add delay between requests
            await new Promise((resolve) => setTimeout(resolve, 500));
          } catch (subjectError) {
            console.error(`Error fetching ${subject}:`, subjectError);
            failedSubjects.push(subject);
          }
        }

        setBooksBySubject(result);

        if (failedSubjects.length > 0) {
          seterrorMsg(
            `Some categories failed to load: ${failedSubjects.join(", ")}`
          );
        }
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      seterrorMsg(error.message || "Error fetching details");
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(debounceSearchTerm);
  }, [debounceSearchTerm]);

  useEffect(() => {
    if (!debounceSearchTerm) {
      fetchBooks("");
    }
  }, []);
  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="/hero-book.png" alt="hero-img" />
            <h1>
              Find <span className="text-gradient">Books</span> You Love
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <section className="py-10">
            <div className="all-books">
              <h2 className="text-center">Popular Books</h2>
              {Object.keys(booksBySubject).length === 0 ? (
                isLoading ? (
                  <Spinner />
                ) : (
                  <p className="text-center text-red-800">{errorMsg}</p>
                )
              ) : debounceSearchTerm ? (
                // 🔎 Show search results
                <>
                  <h3 className="text-lg font-semibold mb-4">
                    Search Results for "{debounceSearchTerm}"
                  </h3>
                  <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {booksBySubject.search?.map((book) => (
                      <BookCard key={book.key} book={book} />
                    ))}
                  </ul>
                </>
              ) : (
                subjects.map((subject) => (
                  <div key={subject} className="mb-10">
                    {/* Subject Title */}
                    <h3 className="text-xl font-semibold mb-3 capitalize">
                      {subject.replace("_", " ")} Books
                    </h3>

                    {/* Horizontal Scroll Row */}
                    <ul className="flex p-5 overflow-x-auto hide-scrollbar space-x-4">
                      {booksBySubject[subject]?.length > 0 ? (
                        booksBySubject[subject].map((book) => (
                          <BookCard key={book.key} book={book} />
                        ))
                      ) : (
                        <p>No books found for {subject}.</p>
                      )}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Home;
