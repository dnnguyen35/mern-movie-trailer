import responseHandler from "../handlers/response.handler.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import tmdbApi from "../tmdb/tmdb.api.js";

const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;
    const lang = req.headers["accept-language"] || "en";

    const response = await tmdbApi.mediaList(
      {
        mediaType,
        mediaCategory,
        page,
      },
      lang
    );

    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;

    const lang = req.headers["accept-language"] || "en";

    const response = await tmdbApi.mediaGenres({ mediaType }, lang);

    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getSearch = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;
    const lang = req.headers["accept-language"] || "en";

    const response = await tmdbApi.mediaSearch(
      {
        query,
        page,
        mediaType: mediaType === "people" ? "person" : mediaType,
      },
      lang
    );

    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;

    const lang = req.headers["accept-language"] || "en";

    const params = { mediaType, mediaId };

    const media = await tmdbApi.mediaDetail(params, lang);

    media.credits = await tmdbApi.mediaCredits(params, lang);

    const videos = await tmdbApi.mediaVideos(params, lang);

    media.videos = videos;

    const recommend = await tmdbApi.mediaRecommend(params, lang);

    media.recommend = recommend.results;

    media.images = await tmdbApi.mediaImages(params, lang);

    const tokenDecoded = tokenMiddleware.tokenDecode(req);

    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data);

      if (user) {
        const isFavorite = await favoriteModel.findOne({
          user: user.id,
          mediaId,
        });
        media.favorite = isFavorite !== null;
      }
    }

    media.reviews = await reviewModel
      .find({ mediaId })
      .populate("user")
      .sort("-createdAt");

    responseHandler.ok(res, media);
  } catch (e) {
    console.log(e);
    responseHandler.error(res);
  }
};

export default {
  getList,
  getGenres,
  getSearch,
  getDetail,
};
