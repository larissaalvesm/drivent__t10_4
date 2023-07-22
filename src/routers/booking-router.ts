import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createBooking, editBooking, getBooking } from '@/controllers';


const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken)
.get('/', getBooking )
.post('/', createBooking)
.put('/:bookingId', editBooking);

export { bookingRouter };
