import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, User, Mail, Shield, Calendar, Package } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TextLink from '@/components/text-link';
import AppLayout from '@/layouts/app-layout';

interface Asset {
    id: number;
    nomor_asset: string;
    nama_barang: string;
    serial_number: string;
    kondisi_perangkat: string;
    status: string;
    kategori_barang: {
        nama_kategori_barang: string;
    };
    site: {
        nama_site: string;
    };
    area_posisi: {
        nama_area: string;
    };
}

interface User {
    id: number;
    username: string;
    name: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
    assets: Asset[];
}

interface Props {
    user: User;
    [key: string]: unknown;
}

export default function ShowUser({ user }: Props) {
    return (
        <AppLayout>
            <Head title={`User: ${user.name}`} />

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <TextLink href={route('users.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </TextLink>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">👤 {user.name}</h1>
                            <p className="text-gray-600">@{user.username}</p>
                        </div>
                    </div>
                    <Link href={route('users.edit', user.id)}>
                        <Button>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                        </Button>
                    </Link>
                </div>

                {/* User Information */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <div className="lg:col-span-2">
                        <Card className="p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">User Information</h2>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <User className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Full Name</p>
                                        <p className="text-sm text-gray-600">{user.name}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                    <User className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Username</p>
                                        <p className="text-sm text-gray-600">@{user.username}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Email Address</p>
                                        <p className="text-sm text-gray-600">{user.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Shield className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Role</p>
                                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="mt-1">
                                            {user.role === 'admin' ? '🔑 Admin' : '👤 User'}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Calendar className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Created</p>
                                        <p className="text-sm text-gray-600">
                                            {new Date(user.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Stats */}
                    <div>
                        <Card className="p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h2>
                            <div className="space-y-4">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600">{user.assets.length}</div>
                                    <p className="text-sm text-gray-600">Assigned Assets</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Assigned Assets */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">📦 Assigned Assets</h2>
                        <Badge variant="outline">{user.assets.length} items</Badge>
                    </div>

                    {user.assets.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Asset
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Location
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Condition
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {user.assets.map((asset) => (
                                        <tr key={asset.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {asset.nama_barang}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {asset.nomor_asset} • {asset.serial_number}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {asset.kategori_barang.nama_kategori_barang}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {asset.site.nama_site} - {asset.area_posisi.nama_area}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Badge variant={asset.kondisi_perangkat === 'Baik' ? 'default' : 'destructive'}>
                                                    {asset.kondisi_perangkat === 'Baik' ? '✅ Good' : '❌ Damaged'}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Badge variant={
                                                    asset.status === 'Used' ? 'default' :
                                                    asset.status === 'Standby' ? 'secondary' : 'outline'
                                                }>
                                                    {asset.status === 'Used' ? '🔄 In Use' :
                                                     asset.status === 'Standby' ? '⏸️ Standby' : '📤 On Loan'}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <Package className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No assets assigned</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                This user doesn't have any assets assigned to them yet.
                            </p>
                        </div>
                    )}
                </Card>
            </div>
        </AppLayout>
    );
}