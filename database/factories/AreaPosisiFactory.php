<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AreaPosisi>
 */
class AreaPosisiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama_area' => fake()->unique()->randomElement([
                'Office',
                'Pancang',
                'Gudang',
                'Barak',
                'Pos Timbangan',
                'Pos Security',
                'Gerbang/ Gate Depan',
                'Rest Area',
                'Parkiran - Viar, Pickup, Motor, mobil',
                'Ruang Meeting',
            ]),
        ];
    }
}