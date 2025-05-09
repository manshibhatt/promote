import Business from "../models/business.model.js";
import createError from "../utils/createError.js";
import User from "../models/user.model.js";

export const createBusiness = async (req, res, next) => {
    try {
      const newBusiness = new Business({
        ...req.body,
        ownerId: req.userId, 
      });
      // console.log(req.userId)
      await newBusiness.save();
      await User.findByIdAndUpdate(req.userId, { isVerified: true });
      
      res.status(201).json({ message: "Business created successfully", business: newBusiness });
    } catch (err) {
      if (err.code === 11000) {
        return next(createError(409, "Business with this email or name already exists"));
      }
      next(createError(500, "Failed to create business"));
    }
  };

  export const getBusinessById = async (req, res, next) => {
    try {
      const ownerId = req.params.id;
          const business = await Business.findOne({ ownerId });
      if (!business) return next(createError(404, "Business not found"));
      res.status(200).json(business);
    } catch (err) {
      next(createError(500, "Error fetching business"));
    }
  };  

  export const updateBusiness = async (req, res, next) => {
    try {
      const updated = await Business.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if (!updated) return next(createError(404, "Business not found"));
      res.status(200).json({ message: "Business updated", business: updated });
    } catch (err) {
      next(createError(500, "Failed to update business"));
    }
  }; 

  export const deleteBusiness = async (req, res, next) => {
    try {
      const deleted = await Business.findByIdAndDelete(req.params.id);
      if (!deleted) return next(createError(404, "Business not found"));
      res.status(200).json({ message: "Business deleted" });
    } catch (err) {
      next(createError(500, "Failed to delete business"));
    }
  };