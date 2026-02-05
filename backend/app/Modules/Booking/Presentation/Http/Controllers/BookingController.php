<?php

declare(strict_types=1);

namespace App\Modules\Booking\Presentation\Http\Controllers;

use App\Modules\Booking\Application\DTOs\CreateBookingData;
use App\Modules\Booking\Application\UseCases\CreateBooking;
use App\Modules\Booking\Domain\Entities\Booking;
use App\Modules\Booking\Presentation\Http\Requests\StoreBookingRequest;
use App\Modules\Booking\Infrastructure\Persistence\Eloquent\BookingModel;
use Illuminate\Http\JsonResponse;

class BookingController
{
    public function index(): JsonResponse
    {
        $bookings = BookingModel::all();
        return response()->json($bookings);
    }

    public function store(StoreBookingRequest $request, CreateBooking $useCase): JsonResponse
    {
        $data = CreateBookingData::fromArray($request->validated());
        $booking = $useCase->execute($data);

        return response()->json([
            'message' => 'Booking received',
            'booking' => $this->toArray($booking),
        ], 201);
    }

    public function update($id): JsonResponse
    {
        $booking = BookingModel::findOrFail($id);
        $booking->update(request()->only(['status']));
        return response()->json($booking);
    }

    public function destroy($id): JsonResponse
    {
        BookingModel::findOrFail($id)->delete();
        return response()->json(['message' => 'Booking deleted']);
    }

    private function toArray(Booking $booking): array
    {
        return [
            'id' => $booking->id,
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
        ];
    }
}

