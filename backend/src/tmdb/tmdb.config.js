const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;

const getUrl = (endpoint, params = {}, lang = "en") => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v != null)
  );

  const languageMode = lang === "en" ? "en-US" : "vi-VN";

  const qs = new URLSearchParams(filteredParams).toString();
  console.log(
    "url :",
    `${baseUrl}${endpoint}?api_key=${key}&language=${languageMode}&${qs}`
  );

  return `${baseUrl}${endpoint}?api_key=${key}&language=${languageMode}&${qs}`;
};

export default { getUrl };
