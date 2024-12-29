import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar ,getUserDetails } from "../controller/User.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/getuser", protectRoute, getUserDetails);

export default router;