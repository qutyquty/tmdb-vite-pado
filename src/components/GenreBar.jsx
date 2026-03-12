import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';

const GenreBar = ({ genres, selectedGenre, onSelect }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button variant='dark' onClick={scrollLeft}>◀</Button>
      <div ref={scrollRef}
        style={{
          display: "flex", overflow: "auto",
          whiteSpace: "nowrap", scrollbarWidth: "none"
        }}
      >
        {genres.map((genre) => (
          <Button key={genre.id}
            variant={selectedGenre === genre.id ? "primary" : "secondary"}
            onClick={() => onSelect(genre.id)}
            style={{ marginRight: "8px" }}
          >
            {genre.name}
          </Button>
        ))}
      </div>
      <Button variant='dark' onClick={scrollRight}>▶</Button>
    </div>
  );
}

export default GenreBar;