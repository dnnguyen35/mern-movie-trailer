import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";

const getPersonDetail = async (req, res) => {
  try {
    const { personId } = req.params;

    const lang = req.headers["accept-language"] || "en";

    const person = await tmdbApi.personDetail({ personId }, lang);

    responseHandler.ok(res, person);
  } catch {
    responseHandler.error(res);
  }
};

const getPersonMedias = async (req, res) => {
  try {
    const { personId } = req.params;

    const lang = req.headers["accept-language"] || "en";

    const medias = await tmdbApi.personMedias({ personId }, lang);

    responseHandler.ok(res, medias);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  getPersonDetail,
  getPersonMedias,
};
