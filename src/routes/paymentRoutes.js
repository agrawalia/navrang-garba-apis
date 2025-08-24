import express from "express";
import { razorpayWebhook } from "../controllers/paymentController.js";

const router = express.Router();

// For Razorpay webhooks we need the raw body for signature verification
router.post("/razorpay/webhook", express.raw({ type: "*/*" }), razorpayWebhook);

export default router;
