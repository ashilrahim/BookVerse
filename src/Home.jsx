import { useEffect, useState } from "react";
import BookCard from "./components/BookCard";
import Spinner from "./components/Spinner";
import Search from "./components/Search";

const Home = () => {
  const subjects = [
    "fantasy",
    "science_fiction",
    "kids_books",
    "history",
    "programming",
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const [isLoading, setisLoading] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");

  const [booksBySubject, setBooksBySubject] = useState({});

  const fetchBooks = async (query) => {
    setisLoading(true);
    seterrorMsg("");

    try {
      if (query) {
        // 🔎 Fetch search results
        const endpoint = `https://openlibrary.org/search.json?q=${query}`;
        const response = await fetch(endpoint);
        const data = await response.json();

        setBooksBySubject({ search: data.docs || [] }); // store results under "search"
      } else {
        // 📚 Fetch subject-wise results
        let result = {};
        for (let subject of subjects) {
          const endpoint = `https://openlibrary.org/subjects/${subject}.json?details=true&limit=10`;
          const response = await fetch(endpoint);
          const data = await response.json();
          result[subject] = data.works || [];
        }
        setBooksBySubject(result);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      seterrorMsg("Error fetching details");
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(searchTerm);
  }, [searchTerm]);
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
