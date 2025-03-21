import express from "express";
import requestHandler from "../handlers/request.handler.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import favoriteController from "../controllers/favorite.controller.js";
import userController from "../controllers/user.controller.js";
import {
  validateSignup,
  validateSignin,
  validateUpdatePassword,
  validateAddFavorite,
} from "../validators/user.validator.js";

const router = express.Router();

router.post(
  "/signup",
  validateSignup,
  requestHandler.validate,
  userController.signup
);

router.post(
  "/signin",
  validateSignin,
  requestHandler.validate,
  userController.signin
);

router.put(
  "/update-password",
  tokenMiddleware.auth,
  validateUpdatePassword,
  requestHandler.validate,
  userController.updatePassword
);

router.get("/info", tokenMiddleware.auth, userController.getInfo);

router.get(
  "/favorites",
  tokenMiddleware.auth,
  favoriteController.getFavoriteOfUser
);

router.post(
  "/favorites",
  tokenMiddleware.auth,
  validateAddFavorite,
  requestHandler.validate,
  favoriteController.addFavorite
);

router.delete(
  "/favorites/:favoriteId",
  tokenMiddleware.auth,
  favoriteController.removeFavorite
);

export default router;
