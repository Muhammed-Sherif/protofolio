<?php

declare(strict_types=1);

namespace App\Modules\Booking\Infrastructure\Persistence\Eloquent;

use Illuminate\Database\Eloquent\Model;

class BookingModel extends Model
{
    protected $table = 'service_bookings';

    protected $fillable = [
        'service_title',
        'service_price',
        'service_duration',
        'client_name',
        'client_email',
        'client_phone',
        'preferred_date',
        'preferred_time',
        'notes',
        'status',
    ];
}
