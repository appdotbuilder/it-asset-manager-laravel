<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Departemen>
 */
class DepartemenFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama_departemen' => fake()->unique()->randomElement([
                'Human Resources',
                'Finance',
                'Operations',
                'Marketing',
                'Sales',
                'IT Support',
                'Administration',
                'Security',
                'Logistics',
                'Production',
            ]),
        ];
    }
}