import bookingData from '../../data/bookings.json' with { type: 'json' };

const getBookingById = (id) => {
    return bookingData.bookings.find((booking) => booking.id === id);
};

export default getBookingById;