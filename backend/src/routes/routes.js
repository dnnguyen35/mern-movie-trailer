import express from "express";
import userRoute from "../routes/user.route.js";
import mediaRoute from "../routes/media.route.js";
import personRoute from "../routes/person.route.js";
import reviewRoute from "../routes/review.route.js";
import adminRoute from "../routes/admin.route.js";

const router = express.Router();

router.use("/user", userRoute);

router.use("/person", personRoute);

router.use("/reviews", reviewRoute);

router.use("/admin", adminRoute);

router.use("/:mediaType", mediaRoute);

export default router;
