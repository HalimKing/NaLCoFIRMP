import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

// Enhanced checkActive function with proper typing
function checkActive(item: NavItem, currentUrl: string): boolean {
    // Check if current URL matches exactly or starts with the item's href
    const isDirectMatch = item.href === currentUrl || currentUrl.startsWith(item.href);
    
    // Check subItems recursively if they exist
    const hasActiveChild = item.subItems?.some(subItem => checkActive(subItem, currentUrl)) ?? false;
    
    return isDirectMatch || hasActiveChild;
}

interface NavMainProps {
    items?: NavItem[];
}

export function NavMain({ items = [] }: NavMainProps) {
    const { url: currentUrl } = usePage();
    
    // Initialize open state for items with submenus
    const [openItems, setOpenItems] = useState<Record<string, boolean>>(() => {
        return items.reduce<Record<string, boolean>>((acc, item) => {
            if (item.subItems?.length) {
                acc[item.title] = checkActive(item, currentUrl);
            }
            return acc;
        }, {});
    });

    const toggleOpen = (title: string) => {
        setOpenItems(prev => ({ ...prev, [title]: !prev[title] }));
    };

    // Type guard for items with subItems
    const hasSubItems = (item: NavItem): item is NavItem & Required<Pick<NavItem, 'subItems'>> => {
        return !!item.subItems && item.subItems.length > 0;
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const isActive = checkActive(item, currentUrl);
                    const isOpen = !!openItems[item.title];

                    if (hasSubItems(item)) {
                        return (
                            <SidebarMenuItem key={item.title} className="flex flex-col items-stretch px-0">
                                <SidebarMenuButton
                                    onClick={() => toggleOpen(item.title)}
                                    isActive={isActive}
                                    className="justify-between"
                                    tooltip={{ children: item.title }}
                                >
                                    <div className="flex items-center gap-2">
                                        {item.icon && <item.icon className="w-4 h-4" />}
                                        <span>{item.title}</span>
                                    </div>
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                    />
                                </SidebarMenuButton>

                                {isOpen && (
                                    <SidebarMenu className="ml-4 my-1 border-l border-border pl-3">
                                        {item.subItems.map((subItem) => (
                                            <SidebarMenuItem key={subItem.title} className="px-0 py-0.5">
                                                <SidebarMenuButton
                                                    size="sm"
                                                    asChild
                                                    isActive={checkActive(subItem, currentUrl)}
                                                    tooltip={{ children: subItem.title }}
                                                >
                                                    <Link href={subItem.href} prefetch>
                                                        {subItem.icon && <subItem.icon size={16} className="mr-2" />}
                                                        <span>{subItem.title}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                )}
                            </SidebarMenuItem>
                        );
                    }

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isActive}
                                tooltip={{ children: item.title }}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon className="w-4 h-4" />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}