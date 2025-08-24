import { listEvents, listEventDays } from "../services/eventService.js";


export const getEvents = async (req, res, next) => {
    try { 
        res.json(await listEvents()); 
    } catch (e) { 
        next(e); 
    }
};


export const getEventDays = async (req, res, next) => {
    try { 
        res.json(await listEventDays(req.params.id)); 
    } catch (e) { 
        next(e); 
    }
};
