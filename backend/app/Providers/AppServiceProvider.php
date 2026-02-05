<?php

namespace App\Providers;

use App\Modules\Booking\Domain\Repositories\BookingRepository;
use App\Modules\Booking\Infrastructure\Persistence\Eloquent\EloquentBookingRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(BookingRepository::class, EloquentBookingRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
