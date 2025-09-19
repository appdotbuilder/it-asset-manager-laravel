<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\HistoryUpdate
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $waktu_update
 * @property int $user_id
 * @property string $keterangan
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|HistoryUpdate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HistoryUpdate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HistoryUpdate query()
 * @method static \Illuminate\Database\Eloquent\Builder|HistoryUpdate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HistoryUpdate whereWaktuUpdate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HistoryUpdate whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HistoryUpdate whereKeterangan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HistoryUpdate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HistoryUpdate whereUpdatedAt($value)
 * @method static \Database\Factories\HistoryUpdateFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class HistoryUpdate extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'waktu_update',
        'user_id',
        'keterangan',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'waktu_update' => 'datetime',
    ];

    /**
     * Get the user that owns the history update.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}