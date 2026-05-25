import React from 'react';
import { DollarSign, TrendingUp, Activity, BarChart2 } from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line 
} from 'recharts';

export default function Earnings() {
    // Mock Data for charts
    const monthlyEarnings = [
        { month: 'Jan', revenue: 4000 },
        { month: 'Feb', revenue: 3000 },
        { month: 'Mar', revenue: 5000 },
        { month: 'Apr', revenue: 4500 },
        { month: 'May', revenue: 6000 },
        { month: 'Jun', revenue: 5500 },
    ];

    // Neo-Brutalist Custom Tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="card" style={{ padding: '1rem', border: '2px solid var(--border)', boxShadow: '4px 4px 0px 0px var(--border)' }}>
                    <p style={{ margin: 0, fontWeight: 800, color: 'var(--text-main)', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>{label}</p>
                    {payload.map((entry, index) => (
                        <p key={`item-${index}`} style={{ margin: '0.25rem 0', color: entry.color, fontWeight: 700 }}>
                            {entry.name}: ${entry.value.toLocaleString()}
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
                <div className="stat-icon"><DollarSign size={24} /></div>
                <h1 style={{ margin: 0 }}>Earnings Report</h1>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}><Activity size={24} /></div>
                    <div>
                        <div className="stat-label">Total Revenue</div>
                        <div className="stat-value text-gradient">$28,000</div>
                    </div>
                </div>

                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}><TrendingUp size={24} /></div>
                    <div>
                        <div className="stat-label">This Month</div>
                        <div className="stat-value">$5,500</div>
                    </div>
                </div>

                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(236, 72, 153, 0.1)', color: 'var(--secondary)' }}><BarChart2 size={24} /></div>
                    <div>
                        <div className="stat-label">Active Leases</div>
                        <div className="stat-value">12</div>
                    </div>
                </div>
            </div>

            <div className="card mb-8">
                <h3 className="mb-6">Revenue Over Time</h3>
                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <BarChart data={monthlyEarnings} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.2} />
                            <XAxis dataKey="month" stroke="var(--text-main)" tick={{ fontWeight: 600 }} />
                            <YAxis stroke="var(--text-main)" tick={{ fontWeight: 600 }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontWeight: 700 }} />
                            <Bar dataKey="revenue" fill="var(--success)" stroke="var(--border)" strokeWidth={2} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
