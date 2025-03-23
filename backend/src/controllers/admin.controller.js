import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";

const getAllUsersWithStats = async (req, res) => {
  try {
    const users = await userModel.aggregate([
      { $match: { isAdmin: false } },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "user",
          as: "reviews",
        },
      },
      {
        $lookup: {
          from: "favorites",
          localField: "_id",
          foreignField: "user",
          as: "favorites",
        },
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          displayName: 1,
          username: 1,
          isActive: 1,
          createdAt: 1,
          totalReviews: { $size: "$reviews" },
          totalFavorites: { $size: "$favorites" },
        },
      },
    ]);

    responseHandler.ok(res, users);
  } catch (error) {
    console.log("error :", error.message);
    responseHandler.error(res);
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find()
      .populate("user", "displayName username")
      .sort({ createdAt: -1 });

    responseHandler.ok(res, reviews);
  } catch (error) {
    responseHandler.error(res);
  }
};

const getAllMoviesWithStats = async (req, res) => {
  try {
    const movies = await favoriteModel.aggregate([
      {
        $group: {
          _id: {
            mediaId: "$mediaId",
            mediaTitle: "$mediaTitle",
          },
          totalReviews: { $sum: 1 },
          mediaRate: { $avg: "$mediaRate" },
        },
      },
      {
        $lookup: {
          from: "favorites",
          localField: "_id.mediaId",
          foreignField: "mediaId",
          as: "favorites",
        },
      },
      {
        $addFields: {
          totalFavorites: { $size: "$favorites" },
        },
      },
      {
        $project: {
          _id: 0,
          mediaId: "$_id.mediaId",
          mediaTitle: "$_id.mediaTitle",
          mediaRate: 1,
          totalReviews: 1,
          totalFavorites: 1,
        },
      },
      { $sort: { totalReviews: -1, totalFavorites: -1 } },
    ]);

    responseHandler.ok(res, movies);
  } catch (error) {
    responseHandler.error(res);
  }
};

export default {
  getAllUsersWithStats,
  getAllReviews,
  getAllMoviesWithStats,
};
