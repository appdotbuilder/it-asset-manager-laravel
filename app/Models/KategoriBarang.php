<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\KategoriBarang
 *
 * @property int $id
 * @property string $nama_kategori_barang
 * @property int $jumlah_barang
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Asset> $assets
 * @property-read int|null $assets_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|KategoriBarang newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|KategoriBarang newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|KategoriBarang query()
 * @method static \Illuminate\Database\Eloquent\Builder|KategoriBarang whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KategoriBarang whereNamaKategoriBarang($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KategoriBarang whereJumlahBarang($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KategoriBarang whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KategoriBarang whereUpdatedAt($value)
 * @method static \Database\Factories\KategoriBarangFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class KategoriBarang extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nama_kategori_barang',
        'jumlah_barang',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'jumlah_barang' => 'integer',
    ];

    /**
     * Get the assets for the category.
     */
    public function assets(): HasMany
    {
        return $this->hasMany(Asset::class);
    }
}