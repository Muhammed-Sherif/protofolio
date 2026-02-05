<?php

use App\Http\Controllers\Api\PortfolioContentController;
use App\Modules\Booking\Presentation\Http\Controllers\BookingController;
use App\Http\Controllers\Api\AdminAuthController;
use Illuminate\Support\Facades\Route;

Route::get('/portfolio/content', [PortfolioContentController::class, 'show']);
Route::middleware('auth:sanctum')->put('/portfolio/content', [PortfolioContentController::class, 'update']);
Route::post('/services/bookings', [BookingController::class, 'store']);
Route::middleware('auth:sanctum')->get('/services/bookings', [BookingController::class, 'index']);
Route::middleware('auth:sanctum')->put('/services/bookings/{id}', [BookingController::class, 'update']);
Route::middleware('auth:sanctum')->delete('/services/bookings/{id}', [BookingController::class, 'destroy']);
Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/admin/profile', [AdminAuthController::class, 'profile']);
Route::middleware('auth:sanctum')->put('/admin/profile', [AdminAuthController::class, 'updateProfile']);
