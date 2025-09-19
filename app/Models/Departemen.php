<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Departemen
 *
 * @property int $id
 * @property string $nama_departemen
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Asset> $assets
 * @property-read int|null $assets_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Departemen newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Departemen newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Departemen query()
 * @method static \Illuminate\Database\Eloquent\Builder|Departemen whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Departemen whereNamaDepartemen($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Departemen whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Departemen whereUpdatedAt($value)
 * @method static \Database\Factories\DepartemenFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Departemen extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nama_departemen',
    ];

    /**
     * Get the assets for the department.
     */
    public function assets(): HasMany
    {
        return $this->hasMany(Asset::class);
    }
}