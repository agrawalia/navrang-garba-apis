import express from "express";
import { getEvents, getEventDays } from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/:id/days", getEventDays);

export default router;
