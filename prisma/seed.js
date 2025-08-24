import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


async function main() {
    const name = "10‑Day Garba Mahotsava";
    const start = new Date("2025-10-01T18:00:00+05:30");
    const days = 10;
    const pricePaise = 19900; // ₹199
    const capacity = 500; // per day

    const existing = await prisma.event.findFirst({ where: { name } });
    if (existing) {
        console.log("Event already exists:", existing.id);
        return;
    }

    const event = await prisma.event.create({
    data: {
        name,
        description: "Dance your heart out for 10 magical nights!",
        location: "Amravati",
        startDate: start,
        endDate: new Date(start.getTime() + (days - 1) * 24 * 60 * 60 * 1000),
        },
    });

const dayRows = Array.from({ length: days }).map((_, i) => ({
    eventId: event.id,
    date: new Date(start.getTime() + i * 24 * 60 * 60 * 1000),
    pricePaise,
    capacity,
    availableTickets: capacity,
}));


await prisma.eventDay.createMany({ data: dayRows });
    console.log("Seeded:", event.name, "with", days, "days");
}

main().finally(() => prisma.$disconnect());
