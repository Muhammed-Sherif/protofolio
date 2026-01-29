<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'muhammed.sherif@gmail.com'],
            [
                'name' => 'Muhammed Sherif',
                'password' => Hash::make('12345678'),
            ]
        );
    }
}
