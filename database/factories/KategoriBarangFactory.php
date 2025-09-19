<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\KategoriBarang>
 */
class KategoriBarangFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama_kategori_barang' => fake()->unique()->randomElement([
                'Laptop',
                'Desktop Computer',
                'Monitor',
                'Keyboard',
                'Mouse',
                'Printer',
                'Scanner',
                'Network Switch',
                'Router',
                'Server',
                'Tablet',
                'Smartphone',
            ]),
            'jumlah_barang' => 0,
        ];
    }
}