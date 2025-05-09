import express from "express";
import User from "../models/user.model.js";
import { getUserById, updateUserImage } from "../controllers/user.controller.js";

const router = express.Router();

router.put("/update-image",updateUserImage); 
router.get("/:id", getUserById );

export default router;
