export function processGenreData(items, genreMap) {
  const genreCount = {};
  items.forEach(item => {
    const weight = 1 / item.genre_ids.length;
    item.genre_ids.forEach(id => {
      const genreName = genreMap[id] || "Unknown";
      genreCount[genreName] = (genreCount[genreName] || 0) + weight;
    });
  });
  return Object.entries(genreCount).map(([name, value]) => ({
    name,
    value
  }));
}

