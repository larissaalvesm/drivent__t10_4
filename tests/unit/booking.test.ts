import bookingRepository from "@/repositories/booking-repository";
import bookingService from "@/services/booking-service";
import { forbiddenError, notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";

describe("Booking Service Unit Tests", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe("get booking by user", () => {
        it("should return booking", async () => {
            const bookingMock = jest.spyOn(bookingRepository, "getBookingByUserId").mockResolvedValueOnce(
                {
                    id: 1,
                    userId: 1,
                    roomId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    Room: {
                        id: 1,
                        name: '102',
                        capacity: 3,
                        hotelId: 1,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                })

            const result = await bookingService.getBooking(1);
            expect(result).toEqual({
                "id": 1,
                "Room": {
                    id: 1,
                    name: '102',
                    capacity: 3,
                    hotelId: 1,
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date),
                }
            })
        })

        it("should return not found error when user has no booking", () => {
            const bookingMock = jest.spyOn(bookingRepository, "getBookingByUserId").mockResolvedValueOnce(null);

            const promise = bookingService.getBooking(1);
            expect(promise).rejects.toEqual(notFoundError());
        })
    })

    describe("create booking", () => {
        it("should return id booking when sucess", async () => {
            const enrollmentMock = jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockResolvedValueOnce({
                id: 1,
                name: "name",
                cpf: "00000000000",
                birthday: new Date(),
                phone: "(31) 999999999",
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                Address: [{
                    id: 1,
                    cep: '0000000',
                    street: 'rua',
                    city: 'cidade',
                    state: 'estado',
                    number: '0',
                    neighborhood: 'bairro',
                    addressDetail: 'detalhe',
                    enrollmentId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }]
            })

            const ticketMock = jest.spyOn(ticketsRepository, "findTicketByEnrollmentId").mockResolvedValueOnce({
                id: 1,
                ticketTypeId:1,
                enrollmentId: 1,
                status: "PAID",
                createdAt: new Date(),
                updatedAt: new Date(),
                TicketType: {
                    id: 1,
                    name: 'name',
                    price: 100,
                    isRemote: false,
                    includesHotel: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            })

            const roomMock = jest.spyOn(hotelRepository, "findRoomById").mockResolvedValueOnce({
                id:1,
                name: "name",
                capacity: 3,
                hotelId: 1,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            })

            const bookingMock = jest.spyOn(bookingRepository, "createBooking").mockResolvedValueOnce({
                id: 1,
                userId: 1,
                roomId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            })

            const rommBookingsMock = jest.spyOn(bookingRepository, "countBookingsByRoom").mockResolvedValueOnce(0)

            const result = await bookingService.createBooking(1, 1);
            expect(result).toEqual(1)
        })

        it("should return not found error when room does not exis", () => {
            const enrollmentMock = jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockResolvedValueOnce({
                id: 1,
                name: "name",
                cpf: "00000000000",
                birthday: new Date(),
                phone: "(31) 999999999",
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                Address: [{
                    id: 1,
                    cep: '0000000',
                    street: 'rua',
                    city: 'cidade',
                    state: 'estado',
                    number: '0',
                    neighborhood: 'bairro',
                    addressDetail: 'detalhe',
                    enrollmentId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }]
            })

            const ticketMock = jest.spyOn(ticketsRepository, "findTicketByEnrollmentId").mockResolvedValueOnce({
                id: 1,
                ticketTypeId:1,
                enrollmentId: 1,
                status: "PAID",
                createdAt: new Date(),
                updatedAt: new Date(),
                TicketType: {
                    id: 1,
                    name: 'name',
                    price: 100,
                    isRemote: false,
                    includesHotel: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            })

            const roomMock = jest.spyOn(hotelRepository, "findRoomById").mockResolvedValueOnce(null);

            const promise = bookingService.createBooking(1, 1);
            expect(promise).rejects.toEqual(notFoundError());
        })

        it("should return forbidden error when romm is fully occupied", async () => {
            const enrollmentMock = jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockResolvedValueOnce({
                id: 1,
                name: "name",
                cpf: "00000000000",
                birthday: new Date(),
                phone: "(31) 999999999",
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                Address: [{
                    id: 1,
                    cep: '0000000',
                    street: 'rua',
                    city: 'cidade',
                    state: 'estado',
                    number: '0',
                    neighborhood: 'bairro',
                    addressDetail: 'detalhe',
                    enrollmentId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }]
            })

            const ticketMock = jest.spyOn(ticketsRepository, "findTicketByEnrollmentId").mockResolvedValueOnce({
                id: 1,
                ticketTypeId:1,
                enrollmentId: 1,
                status: "PAID",
                createdAt: new Date(),
                updatedAt: new Date(),
                TicketType: {
                    id: 1,
                    name: 'name',
                    price: 100,
                    isRemote: false,
                    includesHotel: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            })

            const roomMock = jest.spyOn(hotelRepository, "findRoomById").mockResolvedValueOnce({
                id:1,
                name: "name",
                capacity: 1,
                hotelId: 1,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            })

            const rommBookingsMock = jest.spyOn(bookingRepository, "countBookingsByRoom").mockResolvedValueOnce(3)

            const promise = bookingService.createBooking(1, 1);
            expect(promise).rejects.toEqual(forbiddenError());
        })
    })
})