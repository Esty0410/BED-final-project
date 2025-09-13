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
        const booking = await updateBookingById(id, { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus });

        if (booking) {
            res.status(200).send({
                message: `Booking with id ${id} updated successfully`,
                booking,
            });
        } else {
            res.status(404).json({
                message: `Booking with id ${id} not found...`
            });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error :("});
    }
});

export default router;