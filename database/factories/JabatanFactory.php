<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Jabatan>
 */
class JabatanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama_jabatan' => fake()->unique()->randomElement([
                'Staf',
                'Leader',
                'jr. Spv',
                'Spv',
                'Ast. Mgr',
                'Mgr',
                'Sr. Mgr',
            ]),
        ];
    }
}