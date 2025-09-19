<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAssetRequest;
use App\Http\Requests\UpdateAssetRequest;
use App\Models\Asset;
use App\Models\AreaPosisi;
use App\Models\Departemen;
use App\Models\Jabatan;
use App\Models\KategoriBarang;
use App\Models\Site;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        
        $query = Asset::with([
            'kategoriBarang', 
            'site', 
            'areaPosisi', 
            'user', 
            'departemen', 
            'jabatan'
        ]);

        // Filter assets based on user role
        if (!$user->isAdmin()) {
            // Regular users can only see assets assigned to them
            $query->where('user_id', $user->id);
        }

        // Apply filters
        if ($request->has('kategori_barang_id') && $request->kategori_barang_id) {
            $query->where('kategori_barang_id', $request->kategori_barang_id);
        }

        if ($request->has('kondisi_perangkat') && $request->kondisi_perangkat) {
            $query->where('kondisi_perangkat', $request->kondisi_perangkat);
        }

        if ($request->has('site_id') && $request->site_id) {
            $query->where('site_id', $request->site_id);
        }

        if ($request->has('area_posisi_id') && $request->area_posisi_id) {
            $query->where('area_posisi_id', $request->area_posisi_id);
        }

        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('nomor_asset', 'like', "%{$search}%")
                  ->orWhere('nama_barang', 'like', "%{$search}%")
                  ->orWhere('serial_number', 'like', "%{$search}%");
            });
        }

        $assets = $query->latest()->paginate(15);

        // Get filter options
        $filterOptions = [
            'categories' => KategoriBarang::orderBy('nama_kategori_barang')->get(),
            'sites' => Site::orderBy('nama_site')->get(),
            'areas' => AreaPosisi::orderBy('nama_area')->get(),
            'conditions' => ['Baik', 'Rusak'],
            'statuses' => ['Used', 'Standby', 'Pinjam'],
        ];

        return Inertia::render('assets/index', [
            'assets' => $assets,
            'filterOptions' => $filterOptions,
            'filters' => $request->only([
                'kategori_barang_id', 
                'kondisi_perangkat', 
                'site_id', 
                'area_posisi_id', 
                'status',
                'search'
            ]),
            'canCreate' => $user->isAdmin(),
            'canManageUsers' => $user->isAdmin(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Only admin can create assets
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $formData = [
            'categories' => KategoriBarang::orderBy('nama_kategori_barang')->get(),
            'sites' => Site::orderBy('nama_site')->get(),
            'areas' => AreaPosisi::orderBy('nama_area')->get(),
            'users' => User::orderBy('name')->get(),
            'departments' => Departemen::orderBy('nama_departemen')->get(),
            'positions' => Jabatan::orderBy('nama_jabatan')->get(),
        ];

        return Inertia::render('assets/create', $formData);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAssetRequest $request)
    {
        // Only admin can create assets
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $asset = Asset::create($request->validated());

        // Update category count
        $asset->kategoriBarang()->increment('jumlah_barang');

        return redirect()->route('assets.show', $asset)
            ->with('success', 'Asset created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Asset $asset)
    {
        $user = auth()->user();
        
        // Check if user can view this asset
        if (!$user->isAdmin() && $asset->user_id !== $user->id) {
            abort(403);
        }

        $asset->load([
            'kategoriBarang', 
            'site', 
            'areaPosisi', 
            'user', 
            'departemen', 
            'jabatan'
        ]);

        return Inertia::render('assets/show', [
            'asset' => $asset,
            'canEdit' => $user->isAdmin() || $asset->user_id === $user->id,
            'canDelete' => $user->isAdmin(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Asset $asset)
    {
        $user = auth()->user();
        
        // Check if user can edit this asset
        if (!$user->isAdmin() && $asset->user_id !== $user->id) {
            abort(403);
        }

        $asset->load([
            'kategoriBarang', 
            'site', 
            'areaPosisi', 
            'user', 
            'departemen', 
            'jabatan'
        ]);

        $formData = [
            'asset' => $asset,
            'categories' => KategoriBarang::orderBy('nama_kategori_barang')->get(),
            'sites' => Site::orderBy('nama_site')->get(),
            'areas' => AreaPosisi::orderBy('nama_area')->get(),
            'users' => User::orderBy('name')->get(),
            'departments' => Departemen::orderBy('nama_departemen')->get(),
            'positions' => Jabatan::orderBy('nama_jabatan')->get(),
            'canEditAll' => $user->isAdmin(),
            'canEditLimited' => !$user->isAdmin() && $asset->user_id === $user->id,
        ];

        return Inertia::render('assets/edit', $formData);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAssetRequest $request, Asset $asset)
    {
        $user = auth()->user();
        $validatedData = $request->validated();
        
        // If user is not admin and this is their asset, only update allowed fields
        if (!$user->isAdmin() && $asset->user_id === $user->id) {
            $validatedData = array_intersect_key($validatedData, array_flip(['kondisi_perangkat', 'status']));
        }

        $oldCategoryId = $asset->kategori_barang_id;
        $asset->update($validatedData);

        // Update category counts if category changed (admin only)
        if ($user->isAdmin() && isset($validatedData['kategori_barang_id']) && $oldCategoryId !== $asset->kategori_barang_id) {
            KategoriBarang::find($oldCategoryId)?->decrement('jumlah_barang');
            $asset->kategoriBarang()->increment('jumlah_barang');
        }

        return redirect()->route('assets.show', $asset)
            ->with('success', 'Asset updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Asset $asset)
    {
        // Only admin can delete assets
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        // Update category count
        $asset->kategoriBarang()->decrement('jumlah_barang');
        
        $asset->delete();

        return redirect()->route('assets.index')
            ->with('success', 'Asset deleted successfully.');
    }
}