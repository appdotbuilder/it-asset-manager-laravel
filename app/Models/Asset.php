<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Asset
 *
 * @property int $id
 * @property string $nomor_asset
 * @property int $kategori_barang_id
 * @property string $nama_barang
 * @property string $serial_number
 * @property string|null $operation_system
 * @property string $kondisi_perangkat
 * @property int $site_id
 * @property int $area_posisi_id
 * @property int|null $user_id
 * @property int $departemen_id
 * @property int $jabatan_id
 * @property string $status
 * @property string|null $tanggal_serah_terima
 * @property string|null $keterangan
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\KategoriBarang $kategoriBarang
 * @property-read \App\Models\Site $site
 * @property-read \App\Models\AreaPosisi $areaPosisi
 * @property-read \App\Models\User|null $user
 * @property-read \App\Models\Departemen $departemen
 * @property-read \App\Models\Jabatan $jabatan
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Asset newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Asset newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Asset query()
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereNomorAsset($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereKategoriBarangId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereNamaBarang($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereSerialNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereOperationSystem($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereKondisiPerangkat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereSiteId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereAreaPosisiId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereDepartemenId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereJabatanId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereTanggalSerahTerima($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereKeterangan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Asset whereUpdatedAt($value)
 * @method static \Database\Factories\AssetFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Asset extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nomor_asset',
        'kategori_barang_id',
        'nama_barang',
        'serial_number',
        'operation_system',
        'kondisi_perangkat',
        'site_id',
        'area_posisi_id',
        'user_id',
        'departemen_id',
        'jabatan_id',
        'status',
        'tanggal_serah_terima',
        'keterangan',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tanggal_serah_terima' => 'date',
    ];

    /**
     * Get the category that owns the asset.
     */
    public function kategoriBarang(): BelongsTo
    {
        return $this->belongsTo(KategoriBarang::class);
    }

    /**
     * Get the site that owns the asset.
     */
    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }

    /**
     * Get the area position that owns the asset.
     */
    public function areaPosisi(): BelongsTo
    {
        return $this->belongsTo(AreaPosisi::class);
    }

    /**
     * Get the user that owns the asset.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the department that owns the asset.
     */
    public function departemen(): BelongsTo
    {
        return $this->belongsTo(Departemen::class);
    }

    /**
     * Get the position that owns the asset.
     */
    public function jabatan(): BelongsTo
    {
        return $this->belongsTo(Jabatan::class);
    }
}