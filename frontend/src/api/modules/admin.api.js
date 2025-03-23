import privateClient from "../client/private.client.js";

const adminEndpoints = {
  usersStats: "admin/users-stats",
  reviewsStats: "admin/reviews-stats",
  moviesStats: "admin/movies-stats",
};

const adminApi = {
  getUsersStats: async () => {
    try {
      const response = await privateClient.get(adminEndpoints.usersStats);

      return { response };
    } catch (error) {
      return { error };
    }
  },
  getReviewsStats: async () => {
    try {
      const response = await privateClient.get(adminEndpoints.reviewsStats);

      return { response };
    } catch (error) {
      return { error };
    }
  },
  getMoviesStats: async () => {
    try {
      const response = await privateClient.get(adminEndpoints.moviesStats);

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default adminApi;
