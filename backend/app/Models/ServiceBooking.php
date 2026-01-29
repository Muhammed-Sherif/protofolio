<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceBooking extends Model
{
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
