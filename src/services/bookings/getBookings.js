import bookingData from '../../data/bookings.json' with { type: 'json' };

const getBookings = () => {
    return bookingData.bookings;
};

export default getBookings;