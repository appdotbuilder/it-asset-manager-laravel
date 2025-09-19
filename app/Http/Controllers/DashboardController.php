<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use App\Models\KategoriBarang;
use App\Models\Site;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with asset statistics.
     */
    public function index()
    {
        $totalAssets = Asset::count();
        $usedAssets = Asset::where('status', 'Used')->count();
        $standbyAssets = Asset::where('status', 'Standby')->count();
        $borrowedAssets = Asset::where('status', 'Pinjam')->count();
        
        $goodConditionAssets = Asset::where('kondisi_perangkat', 'Baik')->count();
        $damagedAssets = Asset::where('kondisi_perangkat', 'Rusak')->count();
        
        $totalCategories = KategoriBarang::count();
        $totalSites = Site::count();
        $totalUsers = User::count();

        $recentAssets = Asset::with(['kategoriBarang', 'site', 'user'])
            ->latest()
            ->take(5)
            ->get();

        $categoryStats = KategoriBarang::withCount('assets')
            ->orderBy('assets_count', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'totalAssets' => $totalAssets,
                'usedAssets' => $usedAssets,
                'standbyAssets' => $standbyAssets,
                'borrowedAssets' => $borrowedAssets,
                'goodConditionAssets' => $goodConditionAssets,
                'damagedAssets' => $damagedAssets,
                'totalCategories' => $totalCategories,
                'totalSites' => $totalSites,
                'totalUsers' => $totalUsers,
            ],
            'recentAssets' => $recentAssets,
            'categoryStats' => $categoryStats,
        ]);
    }
}