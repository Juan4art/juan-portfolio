const fs = require('fs');

const data = fs.readFileSync('playlist.json', 'utf-8');
const lines = data.trim().split('\n');

const tracks = lines.map(line => {
  const item = JSON.parse(line);
  let duration = item.duration; // in seconds
  let durationStr = '0:00';
  if (duration) {
    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration % 60).toString().padStart(2, '0');
    durationStr = `${min}:${sec}`;
  }
  return {
    title: item.title,
    artist: item.uploader || 'Unknown',
    genre: 'Playlist Track',
    duration: durationStr,
    videoId: item.id
  };
});

console.log(JSON.stringify(tracks, null, 2));
