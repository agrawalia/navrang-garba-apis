import Razorpay from "razorpay";
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


export const createRazorpayOrderForBooking = async (bookingId) => {
    const booking = await prisma.booking.findUnique({ where: { id: Number(bookingId) } });
    if (!booking) throw new Error("Booking not found");
    if (booking.status !== "PENDING") throw new Error("Booking not pending");

const order = await razorpay.orders.create({
    amount: booking.totalPaise, // in paise
    currency: "INR",
    notes: { bookingId: String(booking.id) },
});

await prisma.payment.create({
    data: {
    bookingId: booking.id,
    provider: "razorpay",
    gatewayOrderId: order.id,
    status: "PENDING",
    amountPaise: booking.totalPaise,
    raw: order,
    },
});
return order;
};

export const verifyRazorpayWebhook = (signature, body) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
};

export const handleRazorpayWebhook = async (rawBody, headers) => {
    const signature = headers["x-razorpay-signature"];
    if (!signature) throw new Error("Missing signature");
    if (!verifyRazorpayWebhook(signature, rawBody)) throw new Error("Invalid signature");

    const event = JSON.parse(rawBody);
    const etype = event.event; // e.g., payment.captured or order.paid

    if (etype === "order.paid") {
    const orderId = event.payload.order.entity.id;
    const paymentId = event.payload.payment.entity.id;

    const payment = await prisma.payment.update({
    where: { gatewayOrderId: orderId },
    data: { status: "SUCCESS", gatewayPaymentId: paymentId, raw: event },
    select: { bookingId: true },
});


const booking = await prisma.booking.findUnique({ where: { id: payment.bookingId } });
    // Atomic confirm + decrement inventory
    await confirmBookingAndDecrementInventory({ bookingId: booking.id, tickets: booking.tickets });

    return { ok: true };
}

if (etype === "payment.failed") {
    // optional: mark failed
    return { ok: true };
}

return { ok: true }; // ignore other events
};
