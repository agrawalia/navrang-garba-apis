import { Router } from "express";
import prisma from "../db.js";


const router = Router();


router.post("/", async (req, res) => {
try {
const { name, email, mobile, tickets, eventDayId } = req.body;
const booking = await prisma.booking.create({
data: { name, email, mobile, tickets, eventDayId }
});
res.json(booking);
} catch (err) {
console.error(err);
res.status(500).json({ error: "Booking failed" });
}
});


export default router;
