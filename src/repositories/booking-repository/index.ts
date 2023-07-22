import { prisma } from '@/config';


async function getBookingByUserId(userId: number) {
    return prisma.booking.findFirst({
      where: {
          userId
      },
      include: {
        Room: true
      }
    });
  }

  async function getBookingById(userId: number, bookingId: number) {
    return prisma.booking.findFirst({
      where: {
        id: bookingId,
        userId,
      },
      include: {
        Room: true
      }
    });
  }

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data:{
        userId,
        roomId
    }
  });
}

async function editBooking(bookingId: number, roomId: number){
    return prisma.booking.update({
        where: {id: bookingId},
        data: {
            roomId
        }
    })
}

async function countBookingsByRoom(roomId: number){
    return prisma.booking.count({
        where: {
           roomId 
        }
    })
}

const bookingRepository = {
  getBookingById,
  getBookingByUserId,
  createBooking,
  editBooking,
  countBookingsByRoom,
};

export default bookingRepository;
