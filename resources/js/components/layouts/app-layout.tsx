import React from 'react';
import { AppShell } from '@/components/app-shell';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppContent } from '@/components/app-content';
import { BreadcrumbItem } from '@/types';

interface AppLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <main className="flex flex-1 flex-col transition-all duration-300 ease-in-out">
                <AppHeader />
                <AppContent breadcrumbs={breadcrumbs}>
                    {children}
                </AppContent>
            </main>
        </AppShell>
    );
}