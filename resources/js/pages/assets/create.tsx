import React from 'react';
import AppLayout from '@/components/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

interface Category {
    id: number;
    nama_kategori_barang: string;
}

interface Site {
    id: number;
    nama_site: string;
    alamat: string;
}

interface Area {
    id: number;
    nama_area: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Department {
    id: number;
    nama_departemen: string;
}

interface Position {
    id: number;
    nama_jabatan: string;
}

interface Props {
    categories: Category[];
    sites: Site[];
    areas: Area[];
    users: User[];
    departments: Department[];
    positions: Position[];
    [key: string]: unknown;
}



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assets',
        href: '/assets',
    },
    {
        title: 'Create',
        href: '/assets/create',
    },
];

export default function CreateAsset({ categories, sites, areas, users, departments, positions }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        nomor_asset: '',
        kategori_barang_id: '',
        nama_barang: '',
        serial_number: '',
        operation_system: '',
        kondisi_perangkat: 'Baik',
        site_id: '',
        area_posisi_id: '',
        user_id: '',
        departemen_id: '',
        jabatan_id: '',
        status: 'Standby',
        tanggal_serah_terima: '',
        keterangan: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/assets');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add New Asset" />
            <div className="p-6">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">➕ Add New Asset</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                            Create a new asset record in your inventory
                        </p>
                    </div>
                    <Link
                        href="/assets"
                        className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        ← Back to Assets
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                    {/* Basic Information */}
                    <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📝 Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Asset Number *
                                </label>
                                <input
                                    type="text"
                                    value={data.nomor_asset}
                                    onChange={e => setData('nomor_asset', e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="e.g., AST-2024-001"
                                    required
                                />
                                {errors.nomor_asset && (
                                    <p className="text-red-600 text-sm mt-1">{errors.nomor_asset}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Category *
                                </label>
                                <select
                                    value={data.kategori_barang_id}
                                    onChange={e => setData('kategori_barang_id', e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.nama_kategori_barang}
                                        </option>
                                    ))}
                                </select>
                                {errors.kategori_barang_id && (
                                    <p className="text-red-600 text-sm mt-1">{errors.kategori_barang_id}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Asset Name *
                                </label>
                                <input
                                    type="text"
                                    value={data.nama_barang}
                                    onChange={e => setData('nama_barang', e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="e.g., Dell Laptop Latitude 7420"
                                    required
                                />
                                {errors.nama_barang && (
                                    <p className="text-red-600 text-sm mt-1">{errors.nama_barang}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Serial Number *
                                </label>
                                <input
                                    type="text"
                                    value={data.serial_number}
                                    onChange={e => setData('serial_number', e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="e.g., ABC123456789"
                                    required
                                />
                                {errors.serial_number && (
                                    <p className="text-red-600 text-sm mt-1">{errors.serial_number}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Operating System
                                </label>
                                <input
                                    type="text"
                                    value={data.operation_system}
                                    onChange={e => setData('operation_system', e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="e.g., Windows 11 Pro"
                                />
                                {errors.operation_system && (
                                    <p className="text-red-600 text-sm mt-1">{errors.operation_system}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Condition *
                                </label>
                                <select
                                    value={data.kondisi_perangkat}
                                    onChange={e => setData('kondisi_perangkat', e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    required
                                >
                                    <option value="Baik">Good (Baik)</option>
                                    <option value="Rusak">Damaged (Rusak)</option>
                                </select>
                                {errors.kondisi_perangkat && (
                                    <p className="text-red-600 text-sm mt-1">{errors.kondisi_perangkat}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Location Information */}
                    <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📍 Location Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Site *
                                </label>
                                <select
                                    value={data.site_id}
                                    onChange={e => setData('site_id', e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    required
                                >
                                    <option value="">Select Site</option>
                                    {sites.map(site => (
                                        <option key={site.id} value={site.id}>
                                            {site.nama_site}
                                        </option>
                                    ))}
                                </select>
                                {errors.site_id && (
                                    <p className="text-red-600 text-sm mt-1">{errors.site_id}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Area/Position *
                                </label>
                                <select
                                    value={data.area_posisi_id}
                                    onChange={e => setData('area_posisi_id', e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    required
                                >
                                    <option value="">Select Area</option>
                                    {areas.map(area => (
                                        <option key={area.id} value={area.id}>
                                            {area.nama_area}
                                        </option>
                                    ))}
                                </select>
                                {errors.area_posisi_id && (
                                    <p className="text-red-600 text-sm mt-1">{errors.area_posisi_id}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Assignment Information */}
                    <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">👤 Assignment Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Assigned User
                                </label>
                                <select
                                    value={data.user_id}
                                    onChange={e => setData('user_id', e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                >
                                    <option value="">No User Assigned</option>
                                    {users.map(user => (
                                        <option key={user.id} value={user.id}>
                                            {user.name} ({user.email})
                                        </option>
                                    ))}
                                </select>
                                {errors.user_id && (
                                    <p className="text-red-600 text-sm mt-1">{errors.user_id}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Department *
                                </label>
                                <select
                                    value={data.departemen_id}
                                    onChange={e => setData('departemen_id', e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    required
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(department => (
                                        <option key={department.id} value={department.id}>
                                            {department.nama_departemen}
                                        </option>
                                    ))}
                                </select>
                                {errors.departemen_id && (
                                    <p className="text-red-600 text-sm mt-1">{errors.departemen_id}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Position *
                                </label>
                                <select
                                    value={data.jabatan_id}
                                    onChange={e => setData('jabatan_id', e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    required
                                >
                                    <option value="">Select Position</option>
                                    {positions.map(position => (
                                        <option key={position.id} value={position.id}>
                                            {position.nama_jabatan}
                                        </option>
                                    ))}
                                </select>
                                {errors.jabatan_id && (
                                    <p className="text-red-600 text-sm mt-1">{errors.jabatan_id}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Status *
                                </label>
                                <select
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    required
                                >
                                    <option value="Standby">Standby</option>
                                    <option value="Used">Used</option>
                                    <option value="Pinjam">Borrowed (Pinjam)</option>
                                </select>
                                {errors.status && (
                                    <p className="text-red-600 text-sm mt-1">{errors.status}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Handover Date
                                </label>
                                <input
                                    type="date"
                                    value={data.tanggal_serah_terima}
                                    onChange={e => setData('tanggal_serah_terima', e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                                {errors.tanggal_serah_terima && (
                                    <p className="text-red-600 text-sm mt-1">{errors.tanggal_serah_terima}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📋 Additional Information</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Notes/Comments
                            </label>
                            <textarea
                                value={data.keterangan}
                                onChange={e => setData('keterangan', e.target.value)}
                                rows={4}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                placeholder="Any additional notes about this asset..."
                            />
                            {errors.keterangan && (
                                <p className="text-red-600 text-sm mt-1">{errors.keterangan}</p>
                            )}
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 rounded-b-lg flex items-center justify-end space-x-4">
                        <Link
                            href="/assets"
                            className="border border-gray-300 hover:border-gray-400 text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:border-gray-500 px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                        >
                            {processing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                    </svg>
                                    Creating...
                                </>
                            ) : (
                                '💾 Create Asset'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}