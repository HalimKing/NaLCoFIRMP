/**
 * File: AppSidebar.tsx
 * Note: Updated with proper TypeScript typing
 */
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { BookOpen, ChartBar, Database, DollarSign, FileText, Folder, LayoutGrid, Plus, Settings, Users } from 'lucide-react';
import AppLogo from './app-logo';
import { LucideIcon } from 'lucide-react';

// Define the NavItem type
export type NavItem = {
    title: string;
    href: string;
    icon?: LucideIcon;
    subItems?: NavItem[];
    className?: string;
    external?: boolean;
};

// --- Main Navigation Items Definition with Nested Structure ---
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'User Management',
        href: '/usermanagement',
        icon: ChartBar,
        subItems: [
            {
                title: 'All Users',
                href: '/analytics/overview',
            },
            {
                title: 'User Roles',
                href: '/analytics/reports',
            },
            
        ]
    },
    {
        title: 'Business Registry',
        href: '/businessRegistration',
        icon: FileText,
        subItems: [
            {
                title: 'Register Business',
                href: '/settings/profile',
                icon: Plus
            },
            
        ]
    },
    {
        title: 'Revenue Tracking',
        href: '/dashboard',
        icon: DollarSign,
    },
    {
        title: 'Reports & Analytics',
        href: '/dashboard',
        icon: ChartBar,
    },
    {
        title: 'System Settings',
        href: '/dashboard',
        icon: Settings,
    },
    {
        title: 'System Logs',
        href: '/dashboard',
        icon: Database,
    },
];

// --- Footer Navigation Items Definition ---
const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
        external: true
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
        external: true
    },
];

// --- The AppSidebar Component ---
export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            {/* Sidebar Header with Logo linking typically to dashboard or home */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Main Content Area - Renders Navigation */}
            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            {/* Sidebar Footer */}
            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}