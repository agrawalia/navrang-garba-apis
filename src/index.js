import express from "express";
import bodyParser from "body-parser";
import bookingRoutes from "./routes/booking";
import paymentRoutes from "./routes/payment";


const app = express();
app.use(bodyParser.json());


app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
