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

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data:{
        userId,
        roomId
    }
  });
}

async function editBooking(){

}

async function countBookingsByRoom(roomId: number){
    return prisma.booking.count({
        where: {
           roomId 
        }
    })
}



const bookingRepository = {
  getBookingByUserId,
  createBooking,
  editBooking,
  countBookingsByRoom,
};

export default bookingRepository;
