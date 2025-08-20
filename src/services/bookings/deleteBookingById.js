import bookingData from '../../data/bookings.json' with { type: 'json' };

const deleteBookingById = (id) => {
    const bookingIndex = bookingData.bookings.findIndex(booking => booking.id === id);

    if (bookingIndex === -1) {
        return null;
    }

    const deletedBookingById = bookingData.bookings.splice(bookingIndex, 1);
    return deletedBookingById;
};

export default deleteBookingById;