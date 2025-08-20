import bookingData from '../../data/bookings.json' with { type: 'json' };

const updateBookingById = (id, updatedBooking) => {
    const bookingIndex = bookingData.bookings.findIndex((booking) => booking.id === id);

    if (bookingIndex === -1) {
        return null;
    }

    const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = updatedBooking;

    bookingData.bookings[bookingIndex] = {
        ...bookingData.bookings[bookingIndex],
        userId: userId || bookingData.bookings[bookingIndex].userId,
        propertyId: propertyId || bookingData.bookings[bookingIndex].propertyId,
        checkinDate: checkinDate || bookingData.bookings[bookingIndex].checkinDate,
        checkoutDate: checkoutDate || bookingData.bookings[bookingIndex].checkoutDate,
        numberOfGuests: numberOfGuests || bookingData.bookings[bookingIndex].numberOfGuests,
        totalPrice: totalPrice || bookingData.bookings[bookingIndex].totalPrice,
        bookingStatus: bookingStatus || bookingData.bookings[bookingIndex].bookingStatus,
    };

    return bookingData.bookings[bookingIndex];
};

export default updateBookingById;