import { Router } from 'express';
import getBookings from '../services/bookings/getBookings.js';
import createBooking from '../services/bookings/createBooking.js';
import getBookingById from '../services/bookings/getBookingById.js';
import getBookingByUserId from '../services/bookings/getBookingByUserId.js';
import deleteBookingById from '../services/bookings/deleteBookingById.js';
import updateBookingById from '../services/bookings/updateBookingById.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

router.get("/", async (req, res) => {
    try {
        const { userId } = req.query;
        let booking;

        if (userId) {
            booking = await getBookingByUserId(userId);
            if (!booking || booking.length === 0) {
                return res.status(404).json({ message: `Booking with userId ${userId} was not found...`})
            }
        } else {
            booking = await getBookings();
            if (!booking || booking.length === 0) {
                return res.status(404).json({ message: `No bookings found...`})
            }
        }

        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({ message: "Internal server error :("});
    }
});

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus} = req.body;
        if ( !userId || !propertyId || !checkinDate || !checkoutDate || !numberOfGuests || !totalPrice || !bookingStatus) {
            console.log("Missing required fields in request body, userId:", userId, "propertyId:", propertyId, "checkinDate:", checkinDate, "checkoutDate:", checkoutDate, "numberOfGuests:", numberOfGuests, "totalPrice:", totalPrice, "bookingStatus:", bookingStatus);
            return res.status(400).json({ message: "Missing required fields"});
        }
        const newBooking = await createBooking(userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus);
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(500).json({ message: "Internal server error :("});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await getBookingById(id);

        if (!booking) {
            res.status(404).json({
                message: `Booking with id ${id} not found...`
            });
        } else {
            res.status(200).json(booking);
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error :("});
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Delete attempt for booking id:", id);

        const booking = await deleteBookingById(id);

        if (!booking) {
            return res.status(404).json({
                message: `Booking with id ${id} was not found...`
            });
        }

        res.status(200).json({
            message: `Booking with id ${id} deleted successfully`,
            booking,
        });
    } catch (err) {
        console.error("Router error:", err);
        res.status(500).json({ message: "Internal server error :(" });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body;
        if ( !checkinDate || !checkoutDate || !numberOfGuests || !totalPrice || !bookingStatus) {
            console.log("Missing required fields in request body, checkinDate:", checkinDate, "checkoutDate:", checkoutDate, "numberOfGuests:", numberOfGuests, "totalPrice:", totalPrice, "bookingStatus:", bookingStatus);
            return res.status(400).json({ message: "Missing required fields"});
        }
        const booking = await updateBookingById(id, { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus });
        console.log("Updated booking:", booking);
        if (booking) {
            console.log("Booking updated successfully 2:", booking);
            res.status(200).send({
                message: `Booking with id ${id} updated successfully`,
                booking,
            });
        } else {
            console.log(`Booking with id ${id} not found for update 2.`);
            res.status(404).json({
                message: `Booking with id ${id} not found...`
            });
        }
    } catch (err) {
        console.log("Error in PUT /:id route 2:", err);
        res.status(500).json({ message: "Internal server error :("});
    }
});

export default router;