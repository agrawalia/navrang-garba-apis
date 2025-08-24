import { Router } from "express";


const router = Router();


// Mock endpoint for UPI/Payment gateway webhook
router.post("/webhook", async (req, res) => {
try {
const { bookingId, status, provider, refId } = req.body;
// TODO: Verify with payment provider before trusting
res.json({ ok: true });
} catch (err) {
res.status(400).json({ error: "Payment error" });
}
});


export default router;
