import express from "express";
import { createBooking, getBookingStatus } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/:id", getBookingStatus);

export default router;
