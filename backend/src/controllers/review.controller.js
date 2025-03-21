import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model.js";

const createReview = async (req, res) => {
  try {
    const { mediaId } = req.params;

    const review = new reviewModel({
      user: req.user.id,
      mediaId,
      ...req.body,
    });

    await review.save();

    responseHandler.created(res, {
      ...review._doc,
      id: review.id,
      user: req.user,
    });
  } catch {
    responseHandler.error(res);
  }
};

const removeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await reviewModel.findOne({
      _id: reviewId,
      user: req.user.id,
    });

    if (!review) return responseHandler.notfound(res);

    await review.deleteOne();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getReviewOfUser = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({ user: req.user.id })
      .sort("-createdAt");

    responseHandler.ok(res, reviews);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  createReview,
  removeReview,
  getReviewOfUser,
};
