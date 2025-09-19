<?php

namespace Database\Factories;

use App\Models\AreaPosisi;
use App\Models\Departemen;
use App\Models\Jabatan;
use App\Models\KategoriBarang;
use App\Models\Site;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Asset>
 */
class AssetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nomor_asset' => fake()->unique()->numerify('AST-####-####'),
            'kategori_barang_id' => KategoriBarang::factory(),
            'nama_barang' => fake()->words(3, true),
            'serial_number' => fake()->unique()->bothify('??##-????-####'),
            'operation_system' => fake()->randomElement(['Windows 10', 'Windows 11', 'Ubuntu 20.04', 'macOS Monterey', null]),
            'kondisi_perangkat' => fake()->randomElement(['Baik', 'Rusak']),
            'site_id' => Site::factory(),
            'area_posisi_id' => AreaPosisi::factory(),
            'user_id' => fake()->boolean(70) ? User::factory() : null,
            'departemen_id' => Departemen::factory(),
            'jabatan_id' => Jabatan::factory(),
            'status' => fake()->randomElement(['Used', 'Standby', 'Pinjam']),
            'tanggal_serah_terima' => fake()->boolean(80) ? fake()->dateTimeBetween('-1 year', 'now') : null,
            'keterangan' => fake()->boolean(60) ? fake()->sentence() : null,
        ];
    }

    /**
     * Indicate that the asset is in good condition.
     */
    public function goodCondition(): static
    {
        return $this->state(fn (array $attributes) => [
            'kondisi_perangkat' => 'Baik',
        ]);
    }

    /**
     * Indicate that the asset is damaged.
     */
    public function damaged(): static
    {
        return $this->state(fn (array $attributes) => [
            'kondisi_perangkat' => 'Rusak',
            'status' => 'Standby',
        ]);
    }

    /**
     * Indicate that the asset is currently in use.
     */
    public function inUse(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Used',
            'kondisi_perangkat' => 'Baik',
            'tanggal_serah_terima' => fake()->dateTimeBetween('-6 months', 'now'),
        ]);
    }
}