<?php

declare(strict_types=1);

namespace App\Modules\Booking\Domain\Repositories;

use App\Modules\Booking\Domain\Entities\Booking;

interface BookingRepository
{
    public function create(Booking $booking): Booking;
}
