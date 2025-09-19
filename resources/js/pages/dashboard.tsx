import React from 'react';
import AppLayout from '@/components/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface DashboardStats {
    totalAssets: number;
    usedAssets: number;
    standbyAssets: number;
    borrowedAssets: number;
    goodConditionAssets: number;
    damagedAssets: number;
    totalCategories: number;
    totalSites: number;
    totalUsers: number;
}

interface RecentAsset {
    id: number;
    nomor_asset: string;
    nama_barang: string;
    kategori_barang: {
        nama_kategori_barang: string;
    };
    site: {
        nama_site: string;
    };
    user?: {
        name: string;
    };
    status: string;
    kondisi_perangkat: string;
    created_at: string;
}

interface CategoryStat {
    id: number;
    nama_kategori_barang: string;
    assets_count: number;
}

interface Props {
    stats: DashboardStats;
    recentAssets: RecentAsset[];
    categoryStats: CategoryStat[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats, recentAssets, categoryStats }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Used': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'Standby': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'Pinjam': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const getConditionColor = (condition: string) => {
        return condition === 'Baik' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="IT Asset Dashboard" />
            <div className="p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📊 IT Asset Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Overview of your organization's IT asset inventory
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Assets */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                                <span className="text-2xl">📦</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Assets</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalAssets}</p>
                            </div>
                        </div>
                    </div>

                    {/* Used Assets */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                                <span className="text-2xl">✅</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">In Use</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.usedAssets}</p>
                            </div>
                        </div>
                    </div>

                    {/* Standby Assets */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                                <span className="text-2xl">⏸️</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Standby</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.standbyAssets}</p>
                            </div>
                        </div>
                    </div>

                    {/* Damaged Assets */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
                                <span className="text-2xl">⚠️</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Damaged</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.damagedAssets}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Assets */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">📋 Recent Assets</h3>
                                <Link
                                    href="/assets"
                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                                >
                                    View All →
                                </Link>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {recentAssets.map((asset) => (
                                        <div key={asset.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{asset.nama_barang}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {asset.nomor_asset} • {asset.kategori_barang.nama_kategori_barang}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    📍 {asset.site.nama_site}
                                                    {asset.user && ` • 👤 ${asset.user.name}`}
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-end space-y-1">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(asset.status)}`}>
                                                    {asset.status}
                                                </span>
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConditionColor(asset.kondisi_perangkat)}`}>
                                                    {asset.kondisi_perangkat}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Category Stats & Quick Actions */}
                    <div className="space-y-6">
                        {/* Category Stats */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">📊 Top Categories</h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-3">
                                    {categoryStats.map((category) => (
                                        <div key={category.id} className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                {category.nama_kategori_barang}
                                            </span>
                                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                                {category.assets_count}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">⚡ Quick Actions</h3>
                            </div>
                            <div className="p-6 space-y-3">
                                <Link
                                    href="/assets/create"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                                >
                                    ➕ Add New Asset
                                </Link>
                                <Link
                                    href="/assets"
                                    className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:border-gray-500 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                                >
                                    📋 View All Assets
                                </Link>
                                <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:border-gray-500 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center">
                                    📄 Generate Report
                                </button>
                            </div>
                        </div>

                        {/* Summary Stats */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">📈 Summary</h3>
                            </div>
                            <div className="p-6 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">🏢 Sites</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{stats.totalSites}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">📦 Categories</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{stats.totalCategories}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">👥 Users</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{stats.totalUsers}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">🔄 Borrowed</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{stats.borrowedAssets}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}