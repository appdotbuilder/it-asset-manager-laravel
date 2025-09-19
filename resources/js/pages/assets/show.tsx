import React from 'react';
import AppLayout from '@/components/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Asset {
    id: number;
    nomor_asset: string;
    nama_barang: string;
    serial_number: string;
    operation_system?: string;
    kondisi_perangkat: string;
    status: string;
    tanggal_serah_terima?: string;
    keterangan?: string;
    created_at: string;
    updated_at: string;
    kategori_barang: {
        nama_kategori_barang: string;
    };
    site: {
        nama_site: string;
        alamat: string;
    };
    area_posisi: {
        nama_area: string;
    };
    user?: {
        name: string;
        email: string;
    };
    departemen: {
        nama_departemen: string;
    };
    jabatan: {
        nama_jabatan: string;
    };
}

interface Props {
    asset: Asset;
    [key: string]: unknown;
}

export default function ShowAsset({ asset }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Assets',
            href: '/assets',
        },
        {
            title: asset.nama_barang,
            href: `/assets/${asset.id}`,
        },
    ];

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

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Asset: ${asset.nama_barang}`} />
            <div className="p-6">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📦 {asset.nama_barang}</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                            Asset Details • {asset.nomor_asset}
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Link
                            href="/assets"
                            className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            ← Back to Assets
                        </Link>
                        <Link
                            href={`/assets/${asset.id}/edit`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            ✏️ Edit Asset
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Asset Information */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">📝 Basic Information</h3>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                            Asset Number
                                        </label>
                                        <p className="text-gray-900 dark:text-white font-medium">{asset.nomor_asset}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                            Category
                                        </label>
                                        <p className="text-gray-900 dark:text-white">{asset.kategori_barang.nama_kategori_barang}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                            Asset Name
                                        </label>
                                        <p className="text-gray-900 dark:text-white font-medium">{asset.nama_barang}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                            Serial Number
                                        </label>
                                        <p className="text-gray-900 dark:text-white">{asset.serial_number}</p>
                                    </div>
                                    {asset.operation_system && (
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                                Operating System
                                            </label>
                                            <p className="text-gray-900 dark:text-white">{asset.operation_system}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Location Information */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">📍 Location Information</h3>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                            Site
                                        </label>
                                        <p className="text-gray-900 dark:text-white font-medium">{asset.site.nama_site}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{asset.site.alamat}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                            Area/Position
                                        </label>
                                        <p className="text-gray-900 dark:text-white">{asset.area_posisi.nama_area}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Assignment Information */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">👤 Assignment Information</h3>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                            Assigned User
                                        </label>
                                        {asset.user ? (
                                            <div>
                                                <p className="text-gray-900 dark:text-white font-medium">{asset.user.name}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{asset.user.email}</p>
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 dark:text-gray-400">No user assigned</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                            Department
                                        </label>
                                        <p className="text-gray-900 dark:text-white">{asset.departemen.nama_departemen}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                            Position
                                        </label>
                                        <p className="text-gray-900 dark:text-white">{asset.jabatan.nama_jabatan}</p>
                                    </div>
                                    {asset.tanggal_serah_terima && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                                Handover Date
                                            </label>
                                            <p className="text-gray-900 dark:text-white">{formatDate(asset.tanggal_serah_terima)}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        {asset.keterangan && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">📋 Notes</h3>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{asset.keterangan}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Status & Condition */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">📊 Status</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                        Current Status
                                    </label>
                                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(asset.status)}`}>
                                        {asset.status}
                                    </span>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                        Condition
                                    </label>
                                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getConditionColor(asset.kondisi_perangkat)}`}>
                                        {asset.kondisi_perangkat}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Timestamps */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🕒 Timeline</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Created
                                    </label>
                                    <p className="text-gray-900 dark:text-white text-sm">{formatDate(asset.created_at)}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Last Updated
                                    </label>
                                    <p className="text-gray-900 dark:text-white text-sm">{formatDate(asset.updated_at)}</p>
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
                                    href={`/assets/${asset.id}/edit`}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
                                >
                                    ✏️ Edit Asset
                                </Link>
                                <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:border-gray-500 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center">
                                    📄 Print Asset Info
                                </button>
                                <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:border-gray-500 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center">
                                    📋 Duplicate Asset
                                </button>
                                <button className="w-full border border-red-300 hover:border-red-400 text-red-700 dark:text-red-400 dark:border-red-600 dark:hover:border-red-500 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center">
                                    🗑️ Delete Asset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}