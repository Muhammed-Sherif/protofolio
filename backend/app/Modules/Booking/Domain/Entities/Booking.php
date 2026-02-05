<?php

declare(strict_types=1);

namespace App\Modules\Booking\Domain\Entities;

final class Booking
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
        public readonly string $status = 'pending',
        public readonly ?int $id = null,
    ) {
    }
}
