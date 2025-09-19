<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAssetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nomor_asset' => 'required|string|max:255|unique:assets,nomor_asset',
            'kategori_barang_id' => 'required|exists:kategori_barangs,id',
            'nama_barang' => 'required|string|max:255',
            'serial_number' => 'required|string|max:255|unique:assets,serial_number',
            'operation_system' => 'nullable|string|max:255',
            'kondisi_perangkat' => 'required|in:Baik,Rusak',
            'site_id' => 'required|exists:sites,id',
            'area_posisi_id' => 'required|exists:area_posisis,id',
            'user_id' => 'nullable|exists:users,id',
            'departemen_id' => 'required|exists:departemens,id',
            'jabatan_id' => 'required|exists:jabatans,id',
            'status' => 'required|in:Used,Standby,Pinjam',
            'tanggal_serah_terima' => 'nullable|date',
            'keterangan' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nomor_asset.required' => 'Asset number is required.',
            'nomor_asset.unique' => 'This asset number is already in use.',
            'kategori_barang_id.required' => 'Category is required.',
            'nama_barang.required' => 'Asset name is required.',
            'serial_number.required' => 'Serial number is required.',
            'serial_number.unique' => 'This serial number is already in use.',
            'kondisi_perangkat.required' => 'Device condition is required.',
            'site_id.required' => 'Site is required.',
            'area_posisi_id.required' => 'Area/Position is required.',
            'departemen_id.required' => 'Department is required.',
            'jabatan_id.required' => 'Position is required.',
            'status.required' => 'Status is required.',
        ];
    }
}