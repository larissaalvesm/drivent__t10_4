import { forbiddenError, notFoundError } from '@/errors';
import bookingRepository from '../../repositories/booking-repository';
import hotelRepository from '../../repositories/hotel-repository';
import ticketsRepository from '../../repositories/tickets-repository';
import enrollmentRepository from '../../repositories/enrollment-repository';


async function getBooking(userId: number) {
    const booking = await bookingRepository.getBookingByUserId(userId);
    if(!booking) throw notFoundError();

    const result = {
        "id": booking.id,
        "Room": booking.Room
    }
    return result;  
}

async function createBooking(userId: number, roomId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) throw notFoundError();

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    if (!ticket) throw notFoundError();

    if(ticket.status !== 'PAID' || ticket.TicketType.isRemote === true || ticket.TicketType.includesHotel === false) throw forbiddenError();
    
    const room = await hotelRepository.findRoomById(roomId);
    if(!room) throw notFoundError();

    const roomBookings = await bookingRepository.countBookingsByRoom(roomId);
    if(roomBookings >= room.capacity) throw forbiddenError();

    const booking =  await bookingRepository.createBooking(userId, roomId);

    return booking.id;
}

async function editBooking(userId: number, roomId: number, bookingId: number) {

    const booking = await bookingRepository.getBookingById(userId, bookingId);
    if(!booking) throw forbiddenError();

    const room = await hotelRepository.findRoomById(roomId);
    if(!room) throw notFoundError();

    const roomBookings = await bookingRepository.countBookingsByRoom(roomId);
    if(roomBookings >= room.capacity) throw forbiddenError();

    const newBooking = await bookingRepository.editBooking(booking.id, roomId);

    return newBooking.id; 
}

export default {
  getBooking,
  createBooking,
  editBooking
};