import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TiltedCard from "./components/TiltedCard";

const BookDetails = () => {
  const { id } = useParams(); // could be work ID or edition ID
  const navigate = useNavigate();
  const [workData, setWorkData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch work-level data
        const workRes = await fetch(`https://openlibrary.org/works/${id}.json`);
        if (workRes.ok) {
          const workJson = await workRes.json();
          const authorKeys = workJson.authors.map((a) => a.author.key);
          const authorNames = await Promise.all(
            authorKeys.map(async (key) => {
              const res = await fetch(`https://openlibrary.org${key}.json`);
              if (res.ok) {
                const data = await res.json();
                return data.name;
              }
              return "Unknown Author";
            })
          );
          if (authorNames) {
            setWorkData({ ...workJson, authorNames });
          } else {
            setWorkData(workJson);
          }
        }

        const rating = await fetch(
          `https://openlibrary.org/works/${id}/ratings.json`
        );
        if (rating.ok) {
          const ratingJson = await rating.json();
          const averageRating = ratingJson.summary.average;
          setWorkData((prev) => ({ ...prev, averageRating }));
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
  if (!workData) return <p>Book details not found.</p>;

  return (
    <main>
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer sm:"
      >
        &larr; Back to home
      </button>
      <div className="book-details p-4 text-white max-sm:py-20 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-start">
          {/* Left Column - Book Cover */}
          <div className="flex justify-center lg:justify-center items-center min-h-full">
            <TiltedCard
              imageSrc={
                workData?.covers
                  ? `https://covers.openlibrary.org/b/id/${workData.covers[0]}-L.jpg`
                  : "/No-Poster.png"
              }
              altText={workData?.title || "Book Cover"}
              containerHeight="300px"
              containerWidth="300px"
              imageHeight="300px"
              imageWidth="300px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
            />
          </div>
          {/* Right Column - Book Details */}
          <div className="text-white space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {workData?.title}
              </h1>
              <p className="text-xl text-gray-300">
                Author: {workData.authorNames || "Unknown"}
              </p>
            </div>

            {/* Rating and Genre */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1 items-center w-5">
                  <span>⭐</span>
                </div>
                <span className="text-gray-300">
                  {(workData.averageRating || "N/A").toFixed(1)} / 5
                </span>
              </div>
              <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                {workData?.subjects ? workData.subjects[0] : "N/A"}
              </span>
            </div>

            {/* Description */}
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                {workData?.description?.value || "No description available."}
              </p>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-3 gap-8 pt-6 border-t border-gray-700">
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Publish-Date</h3>
                <p className="text-white">
                  {workData?.first_publish_date || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Time Period</h3>
                <p className="text-white">
                  {workData?.subject_times[0] || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Language</h3>
                <p className="text-white">English</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default BookDetails;
