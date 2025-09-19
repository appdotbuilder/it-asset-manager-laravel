<?php

namespace Database\Seeders;

use App\Models\AreaPosisi;
use Illuminate\Database\Seeder;

class AreaPosisiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $areas = [
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
        ];

        foreach ($areas as $area) {
            AreaPosisi::create([
                'nama_area' => $area,
            ]);
        }
    }
}