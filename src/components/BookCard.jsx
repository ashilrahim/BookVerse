import { Link } from "react-router-dom";

const BookCard = ({
  book: {
    key,
    title,
    authors,
    cover_id,
    first_publish_year,
    cover_i,
    author_name,
    q,
  },
}) => {
  return (
    <li className="min-w-[150px] bg-dark-100 rounded-lg shadow-md overflow-hidden">
      <Link to={`/book/${key.replace("/works/", "")}`}>
        <img
          src={
            cover_id
              ? `https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`
              : cover_i
              ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
              : "/No-Poster.png"
          }
          alt={title}
          className="w-full h-48 object-cover"
        />
      </Link>

      <div className="p-2">
        <h3 className="text-sm font-semibold truncate">
          {title ? title : q ? q : "Unknown Title"}
        </h3>
        <span>.</span>
        <p className="text-xs text-gray-300 truncate">
          {authors
            ? authors.map((author) => author.name)[0]
            : author_name
            ? author_name.join(", ")
            : "Unknown Author"}
        </p>
        <p className="tex-xs text-gray-300">
          {" "}
          {first_publish_year ? first_publish_year : "N/A"}{" "}
        </p>
      </div>
    </li>
  );
};

export default BookCard;


