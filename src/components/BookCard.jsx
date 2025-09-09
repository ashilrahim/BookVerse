const BookCard = ({
  book: { title, authors, cover_id, first_publish_year },
}) => {
return (
    <li className="min-w-[150px] bg-dark-100 rounded-lg shadow-md overflow-hidden">
      <img
        src={
          cover_id
            ? `https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`
            : "https://via.placeholder.com/150x200?text=No+Cover"
        }
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-2">
        <h3 className="text-sm font-semibold truncate">{title}</h3>
        <span>.</span>
        <p className="text-xs text-gray-300">
          {authors?.[0]?.name || "Unknown Author"}
        </p>
        <p className="tex-xs text-gray-300"> {first_publish_year ? first_publish_year : "N/A"} </p>
      </div>
    </li>
);
};

export default BookCard;
