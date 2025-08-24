export const assert = (cond, msg) => { if (!cond) throw new Error(msg); };


export const validateBookingInput = ({ name, email, phone, eventDayId, tickets }) => {
    assert(name && name.length >= 2 && name.length <= 80, "Invalid name");
    assert(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email), "Invalid email");
    assert(/^\+?\d{10,15}$/.test(phone), "Invalid phone");
    assert(Number.isInteger(eventDayId) && eventDayId > 0, "Invalid eventDayId");
    assert(Number.isInteger(tickets) && tickets > 0 && tickets <= 10, "Invalid tickets (1-10)");
};
