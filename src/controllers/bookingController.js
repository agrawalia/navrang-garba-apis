import { createPendingBooking, getBooking } from "../services/bookingService.js";
import { createRazorpayOrderForBooking } from "../services/paymentService.js";


export const createBooking = async (req, res, next) => {
    try {
        const booking = await createPendingBooking(req.body);
        const order = await createRazorpayOrderForBooking(booking.id);
        res.status(201).json({ bookingId: booking.id, razorpayOrder: order });
    } catch (e) { 
        next(e); 
    }
};

export const getBookingStatus = async (req, res, next) => {
    try { 
        res.json(await getBooking(req.params.id)); 
    } catch (e) { 
        next(e);  
    }
};
