import React, { useState } from 'react';
import AppLayout from '@/components/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';

interface Asset {
    id: number;
    nomor_asset: string;
    nama_barang: string;
    serial_number: string;
    operation_system?: string;
    kondisi_perangkat: string;
    status: string;
    tanggal_serah_terima?: string;
    kategori_barang: {
        nama_kategori_barang: string;
    };
    site: {
        nama_site: string;
    };
    area_posisi: {
        nama_area: string;
    };
    user?: {
        id: number;
        name: string;
    };
    departemen: {
        nama_departemen: string;
    };
    jabatan: {
        nama_jabatan: string;
    };
}

interface FilterOption {
    id: number;
    nama_kategori_barang?: string;
    nama_site?: string;
    nama_area?: string;
}

interface FilterOptions {
    categories: FilterOption[];
    sites: FilterOption[];
    areas: FilterOption[];
    conditions: string[];
    statuses: string[];
}

interface Pagination {
    data: Asset[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    assets: Pagination;
    filterOptions: FilterOptions;
    filters: {
        kategori_barang_id?: string;
        kondisi_perangkat?: string;
        site_id?: string;
        area_posisi_id?: string;
        status?: string;
        search?: string;
    };
    canCreate: boolean;
    canManageUsers: boolean;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assets',
        href: '/assets',
    },
];

export default function AssetsIndex({ assets, filterOptions, filters, canCreate }: Props) {
    const { auth } = usePage<{ auth: { user: { id: number; role: string } } }>().props;
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedFilters, setSelectedFilters] = useState(filters);

    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...selectedFilters, [key]: value || undefined };
        setSelectedFilters(newFilters);
        
        router.get('/assets', newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearch = () => {
        const newFilters = { ...selectedFilters, search: searchTerm || undefined };
        setSelectedFilters(newFilters);
        
        router.get('/assets', newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSelectedFilters({});
        setSearchTerm('');
        router.get('/assets');
    };

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
            <Head title="Assets Management" />
            <div className="p-6">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📦 Assets Management</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                            Manage and track all IT assets in your organization
                        </p>
                    </div>
                    {canCreate && (
                        <Link
                            href="/assets/create"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                        >
                            ➕ Add New Asset
                        </Link>
                    )}
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-4">
                        {/* Search */}
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                🔍 Search Assets
                            </label>
                            <div className="flex">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Asset number, name, or serial..."
                                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                                <button
                                    onClick={handleSearch}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg"
                                >
                                    Search
                                </button>
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                📦 Category
                            </label>
                            <select
                                value={selectedFilters.kategori_barang_id || ''}
                                onChange={(e) => handleFilterChange('kategori_barang_id', e.target.value)}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="">All Categories</option>
                                {filterOptions.categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.nama_kategori_barang}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Site Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                🏢 Site
                            </label>
                            <select
                                value={selectedFilters.site_id || ''}
                                onChange={(e) => handleFilterChange('site_id', e.target.value)}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="">All Sites</option>
                                {filterOptions.sites.map((site) => (
                                    <option key={site.id} value={site.id}>
                                        {site.nama_site}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                📊 Status
                            </label>
                            <select
                                value={selectedFilters.status || ''}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="">All Status</option>
                                {filterOptions.statuses.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Condition Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                🔧 Condition
                            </label>
                            <select
                                value={selectedFilters.kondisi_perangkat || ''}
                                onChange={(e) => handleFilterChange('kondisi_perangkat', e.target.value)}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="">All Conditions</option>
                                {filterOptions.conditions.map((condition) => (
                                    <option key={condition} value={condition}>
                                        {condition}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            onClick={clearFilters}
                            className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 text-sm"
                        >
                            🔄 Clear All Filters
                        </button>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                            Showing {assets.data.length} of {assets.total} assets
                        </div>
                    </div>
                </div>

                {/* Assets Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Asset Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Location & User
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Status & Condition
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {assets.data.map((asset) => (
                                    <tr key={asset.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">
                                                    {asset.nama_barang}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                                    📦 {asset.nomor_asset}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                                    🔢 {asset.serial_number}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    {asset.kategori_barang.nama_kategori_barang}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm text-gray-900 dark:text-white">
                                                    🏢 {asset.site.nama_site}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                                    📍 {asset.area_posisi.nama_area}
                                                </div>
                                                {asset.user && (
                                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                                        👤 {asset.user.name}
                                                    </div>
                                                )}
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    {asset.departemen.nama_departemen} • {asset.jabatan.nama_jabatan}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col space-y-2">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(asset.status)}`}>
                                                    {asset.status}
                                                </span>
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getConditionColor(asset.kondisi_perangkat)}`}>
                                                    {asset.kondisi_perangkat}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={`/assets/${asset.id}`}
                                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                                                >
                                                    👁️ View
                                                </Link>
                                                {(auth.user.role === 'admin' || asset.user?.id === auth.user.id) && (
                                                    <Link
                                                        href={`/assets/${asset.id}/edit`}
                                                        className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300 text-sm"
                                                    >
                                                        ✏️ Edit
                                                    </Link>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {assets.last_page > 1 && (
                        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    Showing page {assets.current_page} of {assets.last_page}
                                </div>
                                <div className="flex space-x-1">
                                    {assets.links.map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => link.url && router.get(link.url)}
                                            disabled={!link.url}
                                            className={`px-3 py-1 text-sm rounded ${
                                                link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : link.url
                                                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500'
                                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {assets.data.length === 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-12 text-center">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No assets found</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            {Object.keys(selectedFilters).length > 0 || searchTerm
                                ? 'Try adjusting your search or filters to find assets.'
                                : 'Get started by adding your first asset to the inventory.'}
                        </p>
                        {canCreate && (
                            <Link
                                href="/assets/create"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                            >
                                Add First Asset
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}