<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HistoryUpdate>
 */
class HistoryUpdateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'waktu_update' => fake()->dateTimeBetween('-1 year', 'now'),
            'user_id' => User::factory(),
            'keterangan' => fake()->sentence(),
        ];
    }
}