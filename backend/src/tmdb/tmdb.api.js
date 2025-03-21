import axiosClient from "../axios/axios.client.js";
import tmdbEndpoints from "./tmdb.endpoints.js";

const tmdbApi = {
  mediaList: async ({ mediaType, mediaCategory, page }, lang) => {
    return await axiosClient.get(
      tmdbEndpoints.mediaList({ mediaType, mediaCategory, page }, lang)
    );
  },
  mediaDetail: async ({ mediaType, mediaId }, lang) => {
    return await axiosClient.get(
      tmdbEndpoints.mediaDetail({ mediaType, mediaId }, lang)
    );
  },
  mediaGenres: async ({ mediaType }, lang) => {
    return await axiosClient.get(
      tmdbEndpoints.mediaGenres({ mediaType }, lang)
    );
  },
  mediaCredits: async ({ mediaType, mediaId }, lang) => {
    return await axiosClient.get(
      tmdbEndpoints.mediaCredits({ mediaType, mediaId }, lang)
    );
  },
  mediaVideos: async ({ mediaType, mediaId }, lang) => {
    return await axiosClient.get(
      tmdbEndpoints.mediaVideos({ mediaType, mediaId }, lang)
    );
  },
  mediaImages: async ({ mediaType, mediaId }, lang) => {
    return await axiosClient.get(
      tmdbEndpoints.mediaImages({ mediaType, mediaId }, lang)
    );
  },
  mediaRecommend: async ({ mediaType, mediaId }, lang) => {
    return await axiosClient.get(
      tmdbEndpoints.mediaRecommend({ mediaType, mediaId }, lang)
    );
  },
  mediaSearch: async ({ mediaType, query, page }, lang) => {
    return await axiosClient.get(
      tmdbEndpoints.mediaSearch({ mediaType, query, page }, lang)
    );
  },
  personDetail: async ({ personId }, lang) => {
    return await axiosClient.get(
      tmdbEndpoints.personDetail({ personId }, lang)
    );
  },
  personMedias: async ({ personId }, lang) => {
    return await axiosClient.get(
      tmdbEndpoints.personMedias({ personId }, lang)
    );
  },
};

export default tmdbApi;
