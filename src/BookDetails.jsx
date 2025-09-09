import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const BookDetails = () => {
  const { id } = useParams(); // could be work ID or edition ID
  const navigate = useNavigate();
  const [workData, setWorkData] = useState(null);
  const [editionData, setEditionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch work-level data
        const workRes = await fetch(`https://openlibrary.org/works/${id}.json`);
        if (workRes.ok) {
          const workJson = await workRes.json();
          setWorkData(workJson);
        }

        // Also fetch edition-level data
        const edRes = await fetch(`https://openlibrary.org/books/${id}.json`);
        if (edRes.ok) {
          const edJson = await edRes.json();
          setEditionData(edJson);
        }
      } catch (err) {
        console.error("Error loading book data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!workData && !editionData) return <p>Book details not found.</p>;

  return (
    <main>
      <div className="book-details p-4 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-start">
          {/* Left Column - Book Cover */}
          <div className="flex items-center lg:justify-start justify-center">
            <img
              src={
                editionData?.covers
                  ? `https://covers.openlibrary.org/b/id/${editionData.covers[0]}-L.jpg`
                  : workData?.covers
                  ? `https://covers.openlibrary.org/b/id/${workData.covers[0]}-L.jpg`
                  : "/No-Poster.png"
              }
              alt={workData?.title || editionData?.title}
            />
          </div>
        </div>
         {/* Right Column - Book Details */}
          <div className="text-white space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Debt-The First 5000 Years
              </h1>
              <p className="text-xl text-gray-300">
                by David Gran
              </p>
            </div>

            {/* Rating and Genre */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {/* Placeholder for stars */}
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <div key={star} className="w-5 h-5 bg-yellow-400 rounded-sm"></div>
                  ))}
                </div>
                <span className="text-gray-300">4/5</span>
              </div>
              <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                Fantasy
              </span>
            </div>

            {/* Description */}
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                In a French duchy, the old Duke has been usurped by his younger 
                brother, Frederick. A young man named Orlando is mistreated by his 
                elder brother, against their dead father's wishes. Rosalind, the old 
                Duke's daughter, has been allowed to remain in court only
              </p>
              <p>
                because she is the closest friend of Celia, Duke Frederick's daughter. 
                When Rosalind is banished from court, she flees to the Forest of 
                Arden with Celia and Touchstone, the court fool; meanwhile, Orlando 
                also escapes to the forest, fleeing his brother. In the Forest of Arden, 
                the old Duke holds court with exiled supporters, including the 
                melancholy
              </p>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-3 gap-8 pt-6 border-t border-gray-700">
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Publish-Date</h3>
                <p className="text-white">2024</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Publisher</h3>
                <p className="text-white">Penguin</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Language</h3>
                <p className="text-white">English</p>
              </div>
            </div>
          </div>
      </div>
    </main>
  );
};
export default BookDetails;

// <div className="book-details">

//   {/* Title / Subtitle */}
//   <h1>{workData?.title || editionData?.title}</h1>
//   {editionData?.subtitle && <h2>{editionData.subtitle}</h2>}

//   <img
//     src={
//       editionData?.covers
//         ? `https://covers.openlibrary.org/b/id/${editionData.covers[0]}-L.jpg`
//         : workData?.covers
//         ? `https://covers.openlibrary.org/b/id/${workData.covers[0]}-L.jpg`
//         : '/No-Poster.png'
//     }
//     alt={workData?.title || editionData?.title}
//   />

//   {/* Description */}
//   <p className='text-white'>{workData?.description?.value || workData?.description || editionData?.description || 'No description available'}</p>

//   {/* Additional details from edition */}
//   <p className='text-white'><strong>Publisher:</strong> {editionData?.publishers?.join(', ') || "unknown"}</p>
//   <p className='text-white'><strong>Publish Date:</strong> {editionData?.publish_date || {workData?.}}</p>
//   <p className='text-white'><strong>Pages:</strong> {editionData?.number_of_pages || 'Unknown'}</p>
//   <p className='text-white'><strong>Identifiers (ISBN):</strong> {editionData?.identifiers?.isbn_10?.join(', ') || 'N/A'}</p>
//   <p className='text-white'><strong>Subjects:</strong> {workData?.subjects?.slice(0,5).join(', ') || 'N/A'}</p>

//   {/* Back button */}
//   <button onClick={() => navigate(-1)}>Back</button>
// </div>
