import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarInset } from '@/components/ui/sidebar';
import { type BreadcrumbItem } from '@/types';
import * as React from 'react';

interface AppContentProps extends React.ComponentProps<'main'> {
    variant?: 'header' | 'sidebar';
    breadcrumbs?: BreadcrumbItem[];
}

export function AppContent({ variant = 'header', breadcrumbs, children, ...props }: AppContentProps) {
    if (variant === 'sidebar') {
        return (
            <SidebarInset {...props}>
                {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
                {children}
            </SidebarInset>
        );
    }

    return (
        <main className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl" {...props}>
            {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
            {children}
        </main>
    );
}
