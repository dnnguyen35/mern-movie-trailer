import tmdbConfig from "./tmdb.config.js";

const tmdbEndpoints = {
  mediaList: ({ mediaType, mediaCategory, page }, lang) => {
    return tmdbConfig.getUrl(`${mediaType}/${mediaCategory}`, { page }, lang);
  },
  mediaDetail: ({ mediaType, mediaId }, lang) => {
    return tmdbConfig.getUrl(`${mediaType}/${mediaId}`, {}, lang);
  },
  mediaGenres: ({ mediaType }, lang) => {
    return tmdbConfig.getUrl(`genre/${mediaType}/list`, {}, lang);
  },
  mediaCredits: ({ mediaType, mediaId }, lang) => {
    return tmdbConfig.getUrl(`${mediaType}/${mediaId}/credits`, {}, lang);
  },
  mediaVideos: ({ mediaType, mediaId }, lang) => {
    const video_lang = "en";
    return tmdbConfig.getUrl(`${mediaType}/${mediaId}/videos`, {}, video_lang);
  },
  mediaRecommend: ({ mediaType, mediaId }, lang) => {
    return tmdbConfig.getUrl(
      `${mediaType}/${mediaId}/recommendations`,
      {},
      lang
    );
  },
  mediaImages: ({ mediaType, mediaId }, lang) => {
    const include_image_language = lang === "en" ? "en,null" : "vi,null";
    return tmdbConfig.getUrl(
      `${mediaType}/${mediaId}/images`,
      { include_image_language },
      lang
    );
  },
  mediaSearch: ({ mediaType, query, page }, lang) => {
    return tmdbConfig.getUrl(`search/${mediaType}`, { query, page }, lang);
  },
  personDetail: ({ personId }, lang) => {
    return tmdbConfig.getUrl(`person/${personId}`, {}, lang);
  },
  personMedias: ({ personId }, lang) => {
    return tmdbConfig.getUrl(`person/${personId}/combined_credits`, {}, lang);
  },
};

export default tmdbEndpoints;
