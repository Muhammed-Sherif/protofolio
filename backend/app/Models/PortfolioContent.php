<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioContent extends Model
{
    protected $fillable = ['slug', 'content'];

    protected $casts = [
        'content' => 'array',
    ];
}
