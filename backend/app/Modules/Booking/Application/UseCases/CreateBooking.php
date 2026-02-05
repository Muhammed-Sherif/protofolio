<?php

declare(strict_types=1);

namespace App\Modules\Booking\Application\UseCases;

use App\Modules\Booking\Application\DTOs\CreateBookingData;
use App\Modules\Booking\Domain\Entities\Booking;
use App\Modules\Booking\Domain\Repositories\BookingRepository;

final class CreateBooking
{
    public function __construct(private readonly BookingRepository $repository)
    {
    }

    public function execute(CreateBookingData $data): Booking
    {
        $booking = new Booking(
            serviceTitle: $data->serviceTitle,
            servicePrice: $data->servicePrice,
            serviceDuration: $data->serviceDuration,
            clientName: $data->clientName,
            clientEmail: $data->clientEmail,
            clientPhone: $data->clientPhone,
            preferredDate: $data->preferredDate,
            preferredTime: $data->preferredTime,
            notes: $data->notes,
            status: 'pending',
        );

        return $this->repository->create($booking);
    }
}
