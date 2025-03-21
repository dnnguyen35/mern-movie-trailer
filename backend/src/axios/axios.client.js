import axios from "axios";

const get = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "identity",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default { get };
