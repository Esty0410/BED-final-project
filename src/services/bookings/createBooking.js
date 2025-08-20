import { v4 as uuidv4 } from 'uuid';
import bookingData from '../../data/bookings.json' with { type: 'json' };

const createBooking = (userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus) => {
    const newBooking = {
        id: uuidv4(),
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus,
    };

    bookingData.bookings.push(newBooking);
    return newBooking;
};

export default createBooking;
