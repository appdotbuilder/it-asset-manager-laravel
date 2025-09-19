import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import AppLayout from '@/layouts/app-layout';

interface User {
    id: number;
    username: string;
    name: string;
    email: string;
    role: string;
}

interface UserFormData {
    username: string;
    name: string;
    email: string;
    password: string;
    role: string;
    [key: string]: string;
}

interface Props {
    user: User;
    roles: string[];
    [key: string]: unknown;
}

export default function EditUser({ user, roles }: Props) {
    const { data, setData, put, processing, errors } = useForm<UserFormData>({
        username: user.username,
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('users.update', user.id));
    };

    return (
        <AppLayout>
            <Head title={`Edit User: ${user.name}`} />

            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-3">
                    <TextLink href={route('users.show', user.id)}>
                        <ArrowLeft className="h-4 w-4" />
                    </TextLink>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">✏️ Edit User</h1>
                        <p className="text-gray-600">Update user account information</p>
                    </div>
                </div>

                {/* Form */}
                <Card className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Username */}
                            <div>
                                <Label htmlFor="username">Username *</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                    placeholder="Enter username"
                                    className="mt-1"
                                    required
                                />
                                <InputError message={errors.username} />
                            </div>

                            {/* Name */}
                            <div>
                                <Label htmlFor="name">Full Name *</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Enter full name"
                                    className="mt-1"
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Enter email address"
                                className="mt-1"
                                required
                            />
                            <InputError message={errors.email} />
                        </div>

                        {/* Password */}
                        <div>
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Leave blank to keep current password"
                                className="mt-1"
                            />
                            <InputError message={errors.password} />
                            <p className="text-sm text-gray-500 mt-1">
                                Leave empty to keep the current password
                            </p>
                        </div>

                        {/* Role */}
                        <div>
                            <Label htmlFor="role">Role *</Label>
                            <select
                                id="role"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                {roles.map(role => (
                                    <option key={role} value={role}>
                                        {role === 'admin' ? '🔑 Admin' : '👤 User'}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.role} />
                            <p className="text-sm text-gray-500 mt-1">
                                {data.role === 'admin' 
                                    ? 'Admin users have full access to all features' 
                                    : 'Regular users can only manage their assigned assets'
                                }
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end space-x-3 pt-6 border-t">
                            <TextLink href={route('users.show', user.id)}>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </TextLink>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Updating...' : 'Update User'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}