<?php

namespace Database\Seeders;

use App\Models\KategoriBarang;
use Illuminate\Database\Seeder;

class KategoriBarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
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
        ];

        foreach ($categories as $category) {
            KategoriBarang::create([
                'nama_kategori_barang' => $category,
                'jumlah_barang' => 0,
            ]);
        }
    }
}