import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
// import StatsCard from './components/StatsCard';
import DemoCard from './components/StatsCard';
import StatsCard from './components/StatsCard';
import { useState } from 'react';
import { Map } from 'lucide-react';
import GhanaMap from './GhanaMap';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];




export default function Dashboard() {

    const [regions] = useState([
        { id: 1, name: 'Greater Accra', businesses: 5241, compliance: 78, revenue: 'GHS 1,245,300' },
        { id: 2, name: 'Ashanti', businesses: 4328, compliance: 71, revenue: 'GHS 987,600' },
        { id: 3, name: 'Western', businesses: 3126, compliance: 65, revenue: 'GHS 724,500' },
        { id: 4, name: 'Eastern', businesses: 2987, compliance: 68, revenue: 'GHS 643,200' },
        { id: 5, name: 'Central', businesses: 2156, compliance: 73, revenue: 'GHS 522,400' }
      ]);
    

    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">

                <StatsCard 
                    title="Users"
                    value={12023}
                    subtitle="Registered Businesses"
                    icon="users"
                    trend="+12.5%"
                    colorTheme="green"
                    progressValue={75}
                    animationDuration={2000}
                />
                <StatsCard 
                    title="Revenue"
                    value={8547}
                    subtitle="Active Inspections"
                    icon="dollar"
                    trend="+23.4%"
                    colorTheme="blue"
                    progressValue={85}
                />
                {/* Total Rvenue */}
                {/* Compliance Rate */}
                {/* Field Agents */}
                <StatsCard 
                    title=""
                    value={312}
                    subtitle="Pending Approvals"
                    icon="pending"
                    trend="+8.7%"
                    colorTheme="purple"
                    progressValue={65}
                />
                   
                   
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Regional Performance</h2>
                        <select className="border rounded p-1 text-sm">
                        <option>All Regions</option>
                        <option>Top 5 Regions</option>
                        <option>Bottom 5 Regions</option>
                        </select>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Region</th>
                            <th className="py-3 px-6 text-left">Businesses</th>
                            <th className="py-3 px-6 text-left">Compliance %</th>
                            <th className="py-3 px-6 text-left">Revenue</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm">
                            {regions.map((region) => (
                            <tr key={region.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-6 text-left">{region.name}</td>
                                <td className="py-3 px-6 text-left">{region.businesses.toLocaleString()}</td>
                                <td className="py-3 px-6 text-left">
                                <div className="flex items-center">
                                    <div className="w-16 bg-gray-200 rounded-full h-2.5">
                                    <div 
                                        className={`h-2.5 rounded-full ${
                                        region.compliance > 70 ? 'bg-green-500' : 
                                        region.compliance > 60 ? 'bg-yellow-500' : 'bg-red-500'
                                        }`} 
                                        style={{ width: `${region.compliance}%` }}
                                    ></div>
                                    </div>
                                    <span className="ml-2">{region.compliance}%</span>
                                </div>
                                </td>
                                <td className="py-3 px-6 text-left">{region.revenue}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>

                {/* Map View Placeholder */}
                <div className="mt-6 bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">National Coverage Map</h2>
                    <GhanaMap />
                </div>
                
            </div>
        </AppLayout>
    );
}
