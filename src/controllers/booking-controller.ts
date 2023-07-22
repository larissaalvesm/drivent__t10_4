import httpStatus from 'http-status';
import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '../services/booking-service';


export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const booking = await bookingService.getBooking(userId);
  return res.status(httpStatus.OK).send(booking);
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId = req.body.roomId as number;

  const bookingId = await bookingService.createBooking(userId, Number(roomId));
  console.log(bookingId);

  return res.status(httpStatus.OK).send({bookingId});
}

export async function editBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  return res.status(httpStatus.OK).send();
}
