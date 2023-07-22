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

async function createBook() {
  return prisma.booking.findMany();
}

async function editBooking(){

}

const bookingRepository = {
  getBookingByUserId,
  createBook,
  editBooking
};

export default bookingRepository;
