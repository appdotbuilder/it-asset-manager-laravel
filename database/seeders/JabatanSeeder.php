<?php

namespace Database\Seeders;

use App\Models\Jabatan;
use Illuminate\Database\Seeder;

class JabatanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $positions = [
            'Staf',
            'Leader',
            'jr. Spv',
            'Spv',
            'Ast. Mgr',
            'Mgr',
            'Sr. Mgr',
        ];

        foreach ($positions as $position) {
            Jabatan::create([
                'nama_jabatan' => $position,
            ]);
        }
    }
}