import prisma from "../prismaClient.js";


export const listEvents = () => prisma.event.findMany({ orderBy: { startDate: "asc" } });


export const listEventDays = (eventId) => prisma.eventDay.findMany({
    where: { eventId: Number(eventId) },
    orderBy: { date: "asc" },
    select: { id: true, date: true, pricePaise: true, capacity: true, availableTickets: true }
});

