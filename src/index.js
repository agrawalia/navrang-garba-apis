import express from "express";
import bodyParser from "body-parser";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

// Health check endpoint
app.get("/health", async (req, res) => {
    try {
      await prisma.$queryRaw`SELECT 1`; // Simple query to check DB connection
      res.json({ status: "ok", db: "connected" });
    } catch (error) {
      console.error("DB connection error:", error);
      res.status(500).json({ status: "error", db: "not connected" });
    }
  });


app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/events", eventRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try {
      await prisma.$connect();
      console.log("✅ Database connected");
    } catch (err) {
      console.error("❌ Database connection failed:", err);
    }
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
