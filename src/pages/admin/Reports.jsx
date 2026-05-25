import React from 'react';
import { PieChart, TrendingUp, Activity, BarChart2, Users, Layers, Calendar } from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line 
} from 'recharts';

export default function Reports() {
    // Mock Data for charts
    const platformGrowth = [
        { month: 'Jan', users: 120, adspaces: 45, bookings: 80 },
        { month: 'Feb', users: 150, adspaces: 52, bookings: 95 },
        { month: 'Mar', users: 200, adspaces: 65, bookings: 120 },
        { month: 'Apr', users: 280, adspaces: 80, bookings: 160 },
        { month: 'May', users: 350, adspaces: 95, bookings: 210 },
        { month: 'Jun', users: 420, adspaces: 110, bookings: 280 },
    ];

    const revenueData = [
        { month: 'Jan', revenue: 15000, platformFee: 1500 },
        { month: 'Feb', revenue: 18000, platformFee: 1800 },
        { month: 'Mar', revenue: 24000, platformFee: 2400 },
        { month: 'Apr', revenue: 32000, platformFee: 3200 },
        { month: 'May', revenue: 45000, platformFee: 4500 },
        { month: 'Jun', revenue: 58000, platformFee: 5800 },
    ];

    // Neo-Brutalist Custom Tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="card" style={{ padding: '1rem', border: '2px solid var(--border)', boxShadow: '4px 4px 0px 0px var(--border)' }}>
                    <p style={{ margin: 0, fontWeight: 800, color: 'var(--text-main)', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>{label}</p>
                    {payload.map((entry, index) => (
                        <p key={`item-${index}`} style={{ margin: '0.25rem 0', color: entry.color, fontWeight: 700 }}>
                            {entry.name}: {entry.value.toLocaleString()}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="animate-fade-in">
            <div className="flex items-center gap-4 mb-8">
                <div className="stat-icon" style={{ background: 'var(--primary)' }}><PieChart size={24} color="#fff" /></div>
                <h1 style={{ margin: 0 }}>System Reports</h1>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}><Users size={24} /></div>
                    <div>
                        <div className="stat-label">Total Users</div>
                        <div className="stat-value text-gradient">1,520</div>
                    </div>
                </div>

                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(236, 72, 153, 0.1)', color: 'var(--secondary)' }}><Layers size={24} /></div>
                    <div>
                        <div className="stat-label">Active Ad Spaces</div>
                        <div className="stat-value">447</div>
                    </div>
                </div>

                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}><Calendar size={24} /></div>
                    <div>
                        <div className="stat-label">Total Bookings</div>
                        <div className="stat-value">945</div>
                    </div>
                </div>

                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}><Activity size={24} /></div>
                    <div>
                        <div className="stat-label">Platform Revenue</div>
                        <div className="stat-value">$19,200</div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Platform Growth Chart */}
                <div className="card">
                    <h3 className="mb-6">Platform Growth</h3>
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer>
                            <LineChart data={platformGrowth} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.2} />
                                <XAxis dataKey="month" stroke="var(--text-main)" tick={{ fontWeight: 600 }} />
                                <YAxis stroke="var(--text-main)" tick={{ fontWeight: 600 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ fontWeight: 700 }} />
                                <Line type="monotone" dataKey="users" stroke="var(--primary)" strokeWidth={4} activeDot={{ r: 8, stroke: 'var(--border)', strokeWidth: 2 }} />
                                <Line type="monotone" dataKey="bookings" stroke="var(--secondary)" strokeWidth={4} activeDot={{ r: 8, stroke: 'var(--border)', strokeWidth: 2 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue Chart */}
                <div className="card">
                    <h3 className="mb-6">Gross Transaction Volume vs Fee</h3>
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer>
                            <BarChart data={revenueData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.2} />
                                <XAxis dataKey="month" stroke="var(--text-main)" tick={{ fontWeight: 600 }} />
                                <YAxis stroke="var(--text-main)" tick={{ fontWeight: 600 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ fontWeight: 700 }} />
                                <Bar dataKey="revenue" name="Total Volume" fill="var(--accent)" stroke="var(--border)" strokeWidth={2} />
                                <Bar dataKey="platformFee" name="Platform Fee" fill="var(--success)" stroke="var(--border)" strokeWidth={2} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
