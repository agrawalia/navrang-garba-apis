import { handleRazorpayWebhook } from "../services/paymentService.js";

export const razorpayWebhook = async (req, res) => {
    try {
        // Raw body is needed for signature verification. In index.js, don't JSON-parse this route.
        const rawBody = req.rawBody?.toString() ?? JSON.stringify(req.body);
        await handleRazorpayWebhook(rawBody, req.headers);
        res.json({ ok: true });
        } catch (e) {
        console.error("Webhook error:", e.message);
        res.status(400).json({ error: e.message });
    }
};
