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

  return res.status(httpStatus.OK).send();
}

export async function editBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  return res.status(httpStatus.OK).send();
}
