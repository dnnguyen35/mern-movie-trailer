import express from "express";
import reviewController from "../controllers/review.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import requestHandler from "../handlers/request.handler.js";
import { validateCreateReview } from "../validators/review.validator.js";

const router = express.Router({ mergeParams: true });

router.get("/", tokenMiddleware.auth, reviewController.getReviewOfUser);

router.post(
  "/",
  tokenMiddleware.auth,
  validateCreateReview,
  requestHandler.validate,
  reviewController.createReview
);

router.delete(
  "/:reviewId",
  tokenMiddleware.auth,
  reviewController.removeReview
);

export default router;
