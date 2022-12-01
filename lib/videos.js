import videoTestData from "../data/videos.json";
import { getWatchedVideos, getMyListVideos } from "./db/hasura";

const fetchVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const BASE_URL = "youtube.googleapis.com/youtube/v3";
  const response = await fetch(`https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`);
  return await response.json();
};

export const getCommonVideos = async (url) => {
  try {
    const isDev = process.env.DEVELOPMENT;
    
    const data = isDev ? videoTestData : await fetchVideos(url);
    
    if (data?.error) {
      console.error("Youtube API error", data.error);
      return [];
    }

    return data.items.map((e) => {
      const id = e.id?.videoId || e.id;

      return {
        title: e.snippet?.title,
        imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        id: id,
        description: e.snippet.description,
        publishTime: e.snippet.publishedAt,
        channelTitle: e.snippet.channelTitle,
        statistics: e.statistics ? e.statistics : { viewCount: 0 },
      };
    });
  } catch (error) {
    console.error("Something went wrong with video library", error);
    return [];
  }
};

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&q=${searchQuery}&type=video`;
  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL = "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";
  return getCommonVideos(URL);
};

export const getYoutubeVideoById = (id) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`;

  return getCommonVideos(URL);
};


export const getWatchItAgainVideos = async (userId, token) => {
  const videos = await getWatchedVideos(userId, token);
  return (
    videos?.map((video) => {
      return {
        id: video.videoId,
        imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
      };
    }) || []
  );
};

export const getMyList = async (userId, token) => {
  const videos = await getMyListVideos(userId, token);
  return (
    videos?.map((video) => {
      return {
        id: video.videoId,
        imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
      };
    }) || []
  );
};