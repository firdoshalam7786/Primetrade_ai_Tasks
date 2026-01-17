import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

import { getProfile,updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/profile", getProfile);
router.put("/profile", updateProfile);

export default router;