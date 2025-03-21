import { body } from "express-validator";

export const validateCreateReview = [
  body("mediaId")
    .exists()
    .withMessage("MediaId is required")
    .isLength({ min: 1 })
    .withMessage("MediaId can not be empty"),
  body("content")
    .exists()
    .withMessage("Content is required")
    .isLength({ min: 1 })
    .withMessage("Content can not be empty"),
  body("mediaType")
    .exists()
    .withMessage("MediaType is required")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("MediaType invalid"),
  body("mediaTitle").exists().withMessage("MediaTitle is required"),
  body("mediaPoster").exists().withMessage("MediaPoster is required"),
];
