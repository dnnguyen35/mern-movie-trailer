import express from "express";
import adminController from "../controllers/admin.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

router.get(
  "/users-stats",
  tokenMiddleware.auth,
  tokenMiddleware.checkAdmin,
  adminController.getAllUsersWithStats
);

router.get(
  "/reviews-stats",
  tokenMiddleware.auth,
  tokenMiddleware.checkAdmin,
  adminController.getAllReviews
);

router.get(
  "/movies-stats",
  tokenMiddleware.auth,
  tokenMiddleware.checkAdmin,
  adminController.getAllMoviesWithStats
);

export default router;
