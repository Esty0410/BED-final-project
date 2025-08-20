import bookingData from '../../data/bookings.json' with { type: 'json'};

const getBookingByUserId = (userId) => {
    return bookingData.bookings.find((booking) => booking.userId === userId);
};

export default getBookingByUserId;

// ik heb deze gemaakt zodat je verschillende userId's kan gebruiken, en niet alleen welke in de opdracht tabel staat
// ik weet niet zeker of dit ook zo mocht of dat het echt ging om deze userId: a1234567-89ab-cdef-0123-456789abcdef