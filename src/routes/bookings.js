import { Router } from 'express';
import getBookings from '../services/bookings/getBookings.js';
import createBooking from '../services/bookings/createBooking.js';
import getBookingById from '../services/bookings/getBookingById.js';
import getBookingByUserId from '../services/bookings/getBookingByUserId.js';
import deleteBookingById from '../services/bookings/deleteBookingById.js';
import updateBookingById from '../services/bookings/updateBookingById.js';
import authMiddleware from '../middleware/advancedAuth.js';

const router = Router();

router.get("/", (req, res) => {
    const { userId } = req.query;

    let booking;

    if (userId) {
        booking = getBookingByUserId(userId);
        if (!booking) {
            return res.status(404).json({ message: `Booking with userId ${userId} was not found...`})
        }
    } else {
        booking = getBookings();
        if (!booking || booking.length === 0) {
            return res.status(404).json({ message: `No bookings found...`})
        }
    }

    res.status(200).json(booking);
});

router.post("/", authMiddleware, (req, res) => {
    const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus} = req.body;
    const newBooking = createBooking(userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus);
    res.status(201).json(newBooking);
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const booking = getBookingById(id);

    if (!booking) {
        res.status(404).json({
            message: `Booking with id ${id} not found...`
        });
    } else {
        res.status(200).json(booking);
    }
});

router.delete("/:id", authMiddleware, (req, res) => {
    const { id } = req.params;
    const booking = deleteBookingById(id);

    if (booking) {
        res.status(200).send({
            message: `Booking with id ${id} deleted successfully`,
            booking,
        });
    } else {
        res.status(404).json({
            message: `Booking with id ${id} was not found...`
        });
    }
});

router.put("/:id", authMiddleware, (req, res) => {
    const { id } = req.params;
    const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body;
    const booking = updateBookingById(id, { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus });

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
});

export default router;