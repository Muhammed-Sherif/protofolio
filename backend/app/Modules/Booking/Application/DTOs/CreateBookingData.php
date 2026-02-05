<?php

declare(strict_types=1);

namespace App\Modules\Booking\Application\DTOs;

final class CreateBookingData
{
    public function __construct(
        public readonly string $serviceTitle,
        public readonly ?string $servicePrice,
        public readonly ?string $serviceDuration,
        public readonly string $clientName,
        public readonly string $clientEmail,
        public readonly ?string $clientPhone,
        public readonly ?string $preferredDate,
        public readonly ?string $preferredTime,
        public readonly ?string $notes,
    ) {
    }

    public static function fromArray(array $payload): self
    {
        return new self(
            serviceTitle: $payload['service_title'] ?? '',
            servicePrice: $payload['service_price'] ?? null,
            serviceDuration: $payload['service_duration'] ?? null,
            clientName: $payload['client_name'] ?? '',
            clientEmail: $payload['client_email'] ?? '',
            clientPhone: $payload['client_phone'] ?? null,
            preferredDate: $payload['preferred_date'] ?? null,
            preferredTime: $payload['preferred_time'] ?? null,
            notes: $payload['notes'] ?? null,
        );
    }
}
