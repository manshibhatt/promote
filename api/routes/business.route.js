import express from "express";
import {
    createBusiness,
    getBusinessById,
    updateBusiness,
    deleteBusiness
  } from "../controllers/business.contoller.js";
  import {verifyToken} from "../middleware/authenticateUser.js"
  
  const router = express.Router();
  
  router.post("/",verifyToken, createBusiness);
  router.get("/:id", getBusinessById);
  router.put("/:id", updateBusiness);
  router.delete("/:id", deleteBusiness);

export default router;  




