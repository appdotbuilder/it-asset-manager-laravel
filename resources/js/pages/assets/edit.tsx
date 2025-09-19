import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import AppLayout from '@/layouts/app-layout';

interface Asset {
    id: number;
    nomor_asset: string;
    kategori_barang_id: number;
    nama_barang: string;
    serial_number: string;
    operation_system: string | null;
    kondisi_perangkat: string;
    site_id: number;
    area_posisi_id: number;
    user_id: number | null;
    departemen_id: number;
    jabatan_id: number;
    status: string;
    tanggal_serah_terima: string | null;
    keterangan: string | null;
    kategori_barang: { nama_kategori_barang: string };
    site: { nama_site: string };
    area_posisi: { nama_area: string };
    user: { name: string } | null;
    departemen: { nama_departemen: string };
    jabatan: { nama_jabatan: string };
}

interface Option {
    id: number;
    nama_kategori_barang?: string;
    nama_site?: string;
    nama_area?: string;
    name?: string;
    nama_departemen?: string;
    nama_jabatan?: string;
}

interface AssetFormData {
    nomor_asset: string;
    kategori_barang_id: number;
    nama_barang: string;
    serial_number: string;
    operation_system: string;
    kondisi_perangkat: string;
    site_id: number;
    area_posisi_id: number;
    user_id: number | '';
    departemen_id: number;
    jabatan_id: number;
    status: string;
    tanggal_serah_terima: string;
    keterangan: string;
    [key: string]: string | number;
}

interface Props {
    asset: Asset;
    categories: Option[];
    sites: Option[];
    areas: Option[];
    users: Option[];
    departments: Option[];
    positions: Option[];
    canEditAll: boolean;
    canEditLimited: boolean;
    [key: string]: unknown;
}

export default function EditAsset({ 
    asset, 
    categories, 
    sites, 
    areas, 
    users, 
    departments, 
    positions, 
    canEditAll, 
    canEditLimited 
}: Props) {

    const { data, setData, put, processing, errors } = useForm<AssetFormData>({
        nomor_asset: asset.nomor_asset,
        kategori_barang_id: asset.kategori_barang_id,
        nama_barang: asset.nama_barang,
        serial_number: asset.serial_number,
        operation_system: asset.operation_system || '',
        kondisi_perangkat: asset.kondisi_perangkat,
        site_id: asset.site_id,
        area_posisi_id: asset.area_posisi_id,
        user_id: asset.user_id || '',
        departemen_id: asset.departemen_id,
        jabatan_id: asset.jabatan_id,
        status: asset.status,
        tanggal_serah_terima: asset.tanggal_serah_terima || '',
        keterangan: asset.keterangan || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('assets.update', asset.id));
    };

    const isFieldEditable = (field: string) => {
        if (canEditAll) return true;
        if (canEditLimited && (field === 'kondisi_perangkat' || field === 'status')) return true;
        return false;
    };

    const handleFieldChange = (fieldName: string, value: string | number) => {
        setData(fieldName as keyof AssetFormData, value as never);
    };

    const renderField = (
        fieldName: string,
        label: string,
        type: 'text' | 'select' | 'date' | 'textarea',
        options?: Option[],
        required = false
    ) => {
        const editable = isFieldEditable(fieldName);
        
        return (
            <div>
                <Label htmlFor={fieldName}>
                    {label} {required && '*'}
                    {!editable && <Badge variant="outline" className="ml-2">Read Only</Badge>}
                </Label>
                
                {type === 'textarea' ? (
                    <textarea
                        id={fieldName}
                        value={data[fieldName as keyof AssetFormData] as string}
                        onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                        disabled={!editable}
                        rows={3}
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!editable ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    />
                ) : type === 'select' ? (
                    <select
                        id={fieldName}
                        value={data[fieldName as keyof AssetFormData] as string | number}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === '') {
                                handleFieldChange(fieldName, '');
                            } else {
                                const numValue = Number(value);
                                handleFieldChange(fieldName, isNaN(numValue) ? value : numValue);
                            }
                        }}
                        disabled={!editable}
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!editable ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        required={required}
                    >
                        {fieldName === 'user_id' && <option value="">Unassigned</option>}
                        {fieldName === 'kondisi_perangkat' && (
                            <>
                                <option value="Baik">✅ Good (Baik)</option>
                                <option value="Rusak">❌ Damaged (Rusak)</option>
                            </>
                        )}
                        {fieldName === 'status' && (
                            <>
                                <option value="Used">🔄 In Use (Used)</option>
                                <option value="Standby">⏸️ Standby</option>
                                <option value="Pinjam">📤 On Loan (Pinjam)</option>
                            </>
                        )}
                        {options?.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.nama_kategori_barang || 
                                 option.nama_site || 
                                 option.nama_area || 
                                 option.name || 
                                 option.nama_departemen || 
                                 option.nama_jabatan}
                            </option>
                        ))}
                    </select>
                ) : (
                    <Input
                        id={fieldName}
                        type={type}
                        value={data[fieldName as keyof AssetFormData] as string}
                        onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                        disabled={!editable}
                        className={`mt-1 ${!editable ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        required={required}
                    />
                )}
                <InputError message={errors[fieldName as keyof AssetFormData]} />
            </div>
        );
    };

    return (
        <AppLayout>
            <Head title={`Edit Asset: ${asset.nama_barang}`} />

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-3">
                    <TextLink href={route('assets.show', asset.id)}>
                        <ArrowLeft className="h-4 w-4" />
                    </TextLink>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">✏️ Edit Asset</h1>
                        <p className="text-gray-600">
                            {canEditAll ? 'Full admin access to all fields' : 'Limited access - condition and status only'}
                        </p>
                    </div>
                </div>

                {/* Permission Notice for Regular Users */}
                {canEditLimited && !canEditAll && (
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <span className="text-blue-400">ℹ️</span>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-blue-800">
                                    Limited Edit Access
                                </h3>
                                <div className="mt-2 text-sm text-blue-700">
                                    <p>
                                        As a regular user, you can only update the <strong>Device Condition</strong> and <strong>Status</strong> fields 
                                        for assets assigned to you. Other fields are read-only.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form */}
                <Card className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">📋 Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {renderField('nomor_asset', 'Asset Number', 'text', undefined, true)}
                                {renderField('nama_barang', 'Asset Name', 'text', undefined, true)}
                                {renderField('kategori_barang_id', 'Category', 'select', categories, true)}
                                {renderField('serial_number', 'Serial Number', 'text', undefined, true)}
                            </div>
                        </div>

                        {/* Technical Information */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">⚙️ Technical Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {renderField('operation_system', 'Operating System', 'text')}
                                {renderField('kondisi_perangkat', 'Device Condition', 'select', undefined, true)}
                                {renderField('status', 'Status', 'select', undefined, true)}
                            </div>
                        </div>

                        {/* Location & Assignment */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">📍 Location & Assignment</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {renderField('site_id', 'Site', 'select', sites, true)}
                                {renderField('area_posisi_id', 'Area/Position', 'select', areas, true)}
                                {renderField('user_id', 'Assigned User', 'select', users)}
                                {renderField('departemen_id', 'Department', 'select', departments, true)}
                                {renderField('jabatan_id', 'Position/Job Title', 'select', positions, true)}
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">📝 Additional Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {renderField('tanggal_serah_terima', 'Handover Date', 'date')}
                                <div className="md:col-span-2">
                                    {renderField('keterangan', 'Notes', 'textarea')}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end space-x-3 pt-6 border-t">
                            <TextLink href={route('assets.show', asset.id)}>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </TextLink>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Updating...' : 'Update Asset'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}