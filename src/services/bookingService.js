import prisma from "../prismaClient.js";
import { validateBookingInput } from "../utils/validators.js";

export const createPendingBooking = async (payload) => {
    validateBookingInput(payload);
    const { name, email, phone, eventDayId, tickets } = payload;

    const day = await prisma.eventDay.findUnique({ where: { id: Number(eventDayId) } });
    if (!day) throw new Error("Event day not found");
    if (day.availableTickets < tickets) throw new Error("Sold out or insufficient tickets");

    const totalPaise = day.pricePaise * tickets;

    const booking = await prisma.booking.create({
    data: {
        eventDayId: day.id,
        buyerName: name,
        buyerEmail: email,
        buyerPhone: phone,
        tickets,
        totalPaise,
        status: "PENDING",
        },
    });

    return booking; 
};

export const confirmBookingAndDecrementInventory = async ({ bookingId, tickets }) => {
    // Atomic: decrement inventory only if enough left, then mark confirmed
    const updated = await prisma.$transaction(async (tx) => {
        const rowCount = await tx.$executeRaw`
        UPDATE "EventDay"
        SET "availableTickets" = "availableTickets" - ${tickets}
        WHERE id = (SELECT "eventDayId" FROM "Booking" WHERE id = ${bookingId})
        AND "availableTickets" >= ${tickets};
        `;

        if (rowCount === 0) throw new Error("Inventory not available anymore");

        const booking = await tx.booking.update({
        where: { id: bookingId },
        data: { status: "CONFIRMED" },
        });

        return booking;
    });
    return updated;
};

export const getBooking = (id) => prisma.booking.findUnique({ where: { id: Number(id) } });
