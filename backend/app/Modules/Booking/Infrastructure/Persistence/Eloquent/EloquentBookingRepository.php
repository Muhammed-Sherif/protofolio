<?php

declare(strict_types=1);

namespace App\Modules\Booking\Infrastructure\Persistence\Eloquent;

use App\Modules\Booking\Domain\Entities\Booking;
use App\Modules\Booking\Domain\Repositories\BookingRepository;
use App\Modules\Booking\Infrastructure\Persistence\Eloquent\BookingModel;

final class EloquentBookingRepository implements BookingRepository
{
    public function create(Booking $booking): Booking
    {
        $record = BookingModel::create([
            'service_title' => $booking->serviceTitle,
            'service_price' => $booking->servicePrice,
            'service_duration' => $booking->serviceDuration,
            'client_name' => $booking->clientName,
            'client_email' => $booking->clientEmail,
            'client_phone' => $booking->clientPhone,
            'preferred_date' => $booking->preferredDate,
            'preferred_time' => $booking->preferredTime,
            'notes' => $booking->notes,
            'status' => $booking->status,
        ]);

        return new Booking(
            serviceTitle: $record->service_title,
            servicePrice: $record->service_price,
            serviceDuration: $record->service_duration,
            clientName: $record->client_name,
            clientEmail: $record->client_email,
            clientPhone: $record->client_phone,
            preferredDate: $record->preferred_date,
            preferredTime: $record->preferred_time,
            notes: $record->notes,
            status: $record->status,
            id: $record->id,
        );
    }
}
