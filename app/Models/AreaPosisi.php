<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\AreaPosisi
 *
 * @property int $id
 * @property string $nama_area
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Asset> $assets
 * @property-read int|null $assets_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|AreaPosisi newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AreaPosisi newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AreaPosisi query()
 * @method static \Illuminate\Database\Eloquent\Builder|AreaPosisi whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaPosisi whereNamaArea($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaPosisi whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaPosisi whereUpdatedAt($value)
 * @method static \Database\Factories\AreaPosisiFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class AreaPosisi extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nama_area',
    ];

    /**
     * Get the assets for the area.
     */
    public function assets(): HasMany
    {
        return $this->hasMany(Asset::class);
    }
}