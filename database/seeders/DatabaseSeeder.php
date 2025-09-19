<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Asset;
use App\Models\KategoriBarang;
use App\Models\Site;
use App\Models\Departemen;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Run specific seeders first
        $this->call([
            KategoriBarangSeeder::class,
            JabatanSeeder::class,
            AreaPosisiSeeder::class,
        ]);

        // Create admin user
        User::factory()->admin()->create([
            'username' => 'admin',
            'name' => 'Administrator',
            'email' => 'admin@example.com',
        ]);

        // Create regular user
        User::factory()->create([
            'username' => 'user',
            'name' => 'Test User',
            'email' => 'user@example.com',
        ]);

        // Create additional users
        User::factory(8)->create();

        // Create sites and departments
        Site::factory(5)->create();
        Departemen::factory(10)->create();

        // Create assets with relationships
        Asset::factory(50)->create();

        // Update category counts
        $categories = KategoriBarang::all();
        foreach ($categories as $category) {
            $category->update([
                'jumlah_barang' => $category->assets()->count()
            ]);
        }
    }
}
