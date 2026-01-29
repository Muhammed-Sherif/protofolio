<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ServiceBooking;
use Illuminate\Http\Request;

class ServiceBookingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_title' => ['required', 'string', 'max:255'],
            'service_price' => ['nullable', 'string', 'max:255'],
            'service_duration' => ['nullable', 'string', 'max:255'],
            'client_name' => ['required', 'string', 'max:255'],
            'client_email' => ['required', 'email', 'max:255'],
            'client_phone' => ['nullable', 'string', 'max:255'],
            'preferred_date' => ['nullable', 'date'],
            'preferred_time' => ['nullable', 'date_format:H:i'],
            'notes' => ['nullable', 'string'],
        ]);

        $booking = ServiceBooking::create($validated);

        return response()->json([
            'message' => 'Booking received',
            'booking' => $booking,
        ], 201);
    }
}
