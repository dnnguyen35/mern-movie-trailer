import privateClient from "../client/private.client.js";

const adminEndpoints = {
  usersStats: "admin/users-stats",
  reviewsStats: "admin/reviews-stats",
  moviesStats: "admin/movies-stats",
  lockUser: ({ userId }) => `admin/lock-user/${userId}`,
  unLockUser: ({ userId }) => `admin/unlock-user/${userId}`,
  removeUserReview: ({ reviewId }) => `admin/remove-user-review/${reviewId}`,
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
  lockUser: async ({ userId }) => {
    try {
      const response = await privateClient.put(
        adminEndpoints.lockUser({ userId })
      );

      return { response };
    } catch (error) {
      return { error };
    }
  },
  unLockUser: async ({ userId }) => {
    try {
      const response = await privateClient.put(
        adminEndpoints.unLockUser({ userId })
      );

      return { response };
    } catch (error) {
      return { error };
    }
  },
  removeUserReview: async ({ reviewId }) => {
    try {
      const response = await privateClient.delete(
        adminEndpoints.removeUserReview({ reviewId })
      );

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default adminApi;
