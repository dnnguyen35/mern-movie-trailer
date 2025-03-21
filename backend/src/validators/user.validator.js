import { body } from "express-validator";
import userModel from "../models/user.model.js";

export const validateSignup = [
  body("username")
    .exists()
    .withMessage("Username is required")
    .isLength({ min: 5 })
    .withMessage("Username minimum is 5 characters")
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });

      if (user) return Promise.reject("Username already used");
    }),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 1 })
    .withMessage("Password minimum is 1 characters"),
  body("confirmPassword")
    .exists()
    .withMessage("Hey confirm password is required")
    .isLength({ min: 1 })
    .withMessage("Confirm password minimum is 1 characters")
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Confirm password does not match");
      return true;
    }),
  body("displayName")
    .exists()
    .withMessage("DisplayName is required")
    .isLength({ min: 5 })
    .withMessage("DisplayName minimum is  5 characters"),
];

export const validateUpdatePassword = [
  body("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 1 })
    .withMessage("Password minimum is 1 characters"),
  body("newPassword")
    .exists()
    .withMessage("NewPassword is required")
    .isLength({ min: 1 })
    .withMessage("NewPassword minimum is 1 characters"),
  body("confirmNewPassword")
    .exists()
    .withMessage("ConfirmNewPassword is required")
    .isLength({ min: 1 })
    .withMessage("ConfirmNewPassword minimum 1 characters")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword)
        throw new Error("Confirm New Password does not match");
      return true;
    }),
];

export const validateSignin = [
  body("username")
    .exists()
    .withMessage("Username is required")
    .isLength({ min: 5 })
    .withMessage("Username minimum is 5 characters"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 1 })
    .withMessage("Password minimum is 1 characters"),
];

export const validateAddFavorite = [
  body("mediaType")
    .exists()
    .withMessage("MediaType is required")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("MediaType is invalid"),
  body("mediaId")
    .exists()
    .withMessage("MediaId is required")
    .isLength({ min: 1 })
    .withMessage("MediaId can not be empty"),
  body("mediaTitle").exists().withMessage("MediaTitle is required"),
  body("mediaPoster").exists().withMessage("MediaPoster is required"),
  body("mediaRate").exists().withMessage("MediaRate is required"),
];
