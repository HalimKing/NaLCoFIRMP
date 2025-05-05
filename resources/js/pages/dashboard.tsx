import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import StatsCard from './components/StatsCard';
import { useState } from 'react';
import { Map, BarChart2, Table as TableIcon } from 'lucide-react';
import GhanaMap from './GhanaMap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const [regions] = useState([
        { id: 1, name: 'Greater Accra', businesses: 5241, compliance: 78, revenue: 'GHS 1,245,300', revenueValue: 1245300 },
        { id: 2, name: 'Ashanti', businesses: 4328, compliance: 71, revenue: 'GHS 987,600', revenueValue: 987600 },
        { id: 3, name: 'Western', businesses: 3126, compliance: 65, revenue: 'GHS 724,500', revenueValue: 724500 },
        { id: 4, name: 'Eastern', businesses: 2987, compliance: 68, revenue: 'GHS 643,200', revenueValue: 643200 },
        { id: 5, name: 'Central', businesses: 2156, compliance: 73, revenue: 'GHS 522,400', revenueValue: 522400 }
    ]);
    
    const [regionFilter, setRegionFilter] = useState('All Regions');
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'chart'

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
                        icon="clipboard"
                        trend="+23.4%"
                        colorTheme="blue"
                        progressValue={85}
                    />
                    <StatsCard 
                        title=""
                        value={312}
                        subtitle="Pending Approvals"
                        icon="pending"
                        trend="+8.7%"
                        colorTheme="purple"
                        progressValue={92}
                    />
                    <StatsCard 
                        title=""
                        value={892902}
                        subtitle="Total Revenue"
                        icon="dollar"
                        trend="+8.7%"
                        colorTheme="purple"
                        progressValue={65}
                    />
                    <StatsCard 
                        title=""
                        value={26}
                        subtitle="Compliance Rate"
                        icon="chart"
                        trend="+8.7%"
                        colorTheme="teal"
                        progressValue={65}
                    />
                    <StatsCard 
                        title=""
                        value={17290}
                        subtitle="Field Agents"
                        icon="users"
                        trend="+8.7%"
                        colorTheme="orange"
                        progressValue={65}
                    />
                </div>

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[80vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold dark:text-white">Regional Performance</h2>
                            <div className="flex items-center gap-4">
                                <select 
                                    className="border dark:border-gray-600 rounded p-1 text-sm dark:bg-gray-700 dark:text-white"
                                    value={regionFilter}
                                    onChange={(e) => setRegionFilter(e.target.value)}
                                >
                                    <option className="dark:bg-gray-700">All Regions</option>
                                    <option className="dark:bg-gray-700">Top 5 Regions</option>
                                    <option className="dark:bg-gray-700">Bottom 5 Regions</option>
                                </select>
                                
                                <div className="flex border rounded overflow-hidden">
                                    <button 
                                        onClick={() => setViewMode('table')}
                                        className={`flex items-center p-1 px-2 ${viewMode === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-300'}`}
                                    >
                                        <TableIcon size={16} className="mr-1" />
                                        <span className="text-sm">Table</span>
                                    </button>
                                    <button 
                                        onClick={() => setViewMode('chart')}
                                        className={`flex items-center p-1 px-2 ${viewMode === 'chart' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-300'}`}
                                    >
                                        <BarChart2 size={16} className="mr-1" />
                                        <span className="text-sm">Chart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {viewMode === 'table' ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white dark:bg-gray-800">
                                    <thead>
                                        <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm leading-normal">
                                            <th className="py-3 px-6 text-left">Region</th>
                                            <th className="py-3 px-6 text-left">Businesses</th>
                                            <th className="py-3 px-6 text-left">Compliance %</th>
                                            <th className="py-3 px-6 text-left">Revenue</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-300 text-sm">
                                        {regions.map((region) => (
                                        <tr key={region.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="py-3 px-6 text-left">{region.name}</td>
                                            <td className="py-3 px-6 text-left">{region.businesses.toLocaleString()}</td>
                                            <td className="py-3 px-6 text-left">
                                                <div className="flex items-center">
                                                    <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
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
                        ) : (
                            <div className="h-96 mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={regions}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                                        <Tooltip 
                                            formatter={(value, name) => {
                                                if (name === 'businesses') return [value.toLocaleString(), 'Businesses'];
                                                if (name === 'compliance') return [`${value}%`, 'Compliance Rate'];
                                                if (name === 'revenueValue') return [`GHS ${(value).toLocaleString()}`, 'Revenue'];
                                                return [value, name];
                                            }}
                                        />
                                        <Legend />
                                        <Bar yAxisId="left" dataKey="businesses" fill="#8884d8" name="Businesses" />
                                        <Bar yAxisId="left" dataKey="compliance" fill="#82ca9d" name="Compliance Rate" />
                                        <Bar yAxisId="right" dataKey="revenueValue" fill="#ffc658" name="Revenue" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
                </div>

                {/* Map View */}
                <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-gray-700">
                    <h2 className="text-lg font-semibold mb-4 dark:text-white">National Coverage Map</h2>
                    <GhanaMap />
                </div>
            </div>
        </AppLayout>
    );
}