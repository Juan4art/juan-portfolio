const https = require('https');

https.get('https://youtube.com/playlist?list=PLETn-777y5dY', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const match = data.match(/var ytInitialData = (.*);<\/script>/);
    if (match && match[1]) {
      const parsed = JSON.parse(match[1]);
      const tabs = parsed.contents?.twoColumnBrowseResultsRenderer?.tabs;
      if (!tabs) return console.log("No tabs found");
      const playlistVideoListRenderer = tabs[0].tabRenderer?.content?.sectionListRenderer?.contents[0]?.itemSectionRenderer?.contents[0]?.playlistVideoListRenderer;
      if (!playlistVideoListRenderer) return console.log("No playlistVideoListRenderer found");
      const videos = playlistVideoListRenderer.contents.filter(c => c.playlistVideoRenderer).map(c => {
        const v = c.playlistVideoRenderer;
        return {
          title: v.title?.runs?.[0]?.text,
          artist: v.shortBylineText?.runs?.[0]?.text,
          genre: 'Playlist',
          duration: v.lengthText?.simpleText,
          videoId: v.videoId
        };
      });
      console.log(JSON.stringify(videos, null, 2));
    } else {
      console.log("ytInitialData not found");
    }
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
