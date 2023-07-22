import { notFoundError } from '@/errors';
import bookingRepository from '../../repositories/booking-repository';
import { number } from 'joi';


async function getBooking(userId: number) {
    const booking = await bookingRepository.getBookingByUserId(userId);
    if(!booking) throw notFoundError();

    const result = {
        "id": booking.id,
        "Room": booking.Room
    }
    return result;  
}

async function createBooking(userId: number) {
 
}

async function editBooking(userId: number) {
 
}

export default {
  getBooking,
  createBooking,
  editBooking
};