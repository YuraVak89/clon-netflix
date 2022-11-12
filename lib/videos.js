import videoData from "../data/videos.json";

const getVideos = async (searchQuery) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=15&q=${searchQuery}&key=${YOUTUBE_API_KEY}`
  );
  const data = await response.json()

  return data.items.map(e => {
    return {
      title: e.snippet.title,
      imgUrl: e.snippet.thumbnails.high.url,
      id: e?.id?.videoId
    }
  });
};

export { getVideos };
