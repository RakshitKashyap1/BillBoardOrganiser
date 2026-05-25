import React from 'react';
import { PieChart, TrendingUp, Activity, BarChart2 } from 'lucide-react';
import { 
    LineChart, Line, BarChart, Bar, 
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

export default function Reports() {
    // Mock Data for charts
    const performanceData = [
        { name: 'Mon', impressions: 4000, clicks: 240 },
        { name: 'Tue', impressions: 3000, clicks: 139 },
        { name: 'Wed', impressions: 2000, clicks: 980 },
        { name: 'Thu', impressions: 2780, clicks: 390 },
        { name: 'Fri', impressions: 1890, clicks: 480 },
        { name: 'Sat', impressions: 2390, clicks: 380 },
        { name: 'Sun', impressions: 3490, clicks: 430 },
    ];

    const spendData = [
        { name: 'Week 1', budget: 4000, spent: 2400 },
        { name: 'Week 2', budget: 3000, spent: 1398 },
        { name: 'Week 3', budget: 2000, spent: 3800 },
        { name: 'Week 4', budget: 2780, spent: 3908 },
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
                <div className="stat-icon"><PieChart size={24} /></div>
                <h1 style={{ margin: 0 }}>Campaign Reports</h1>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(67, 56, 202, 0.1)', color: 'var(--primary)' }}><Activity size={24} /></div>
                    <div>
                        <div className="stat-label">Total Impressions</div>
                        <div className="stat-value text-gradient">1.2M</div>
                    </div>
                </div>

                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(236, 72, 153, 0.1)', color: 'var(--secondary)' }}><TrendingUp size={24} /></div>
                    <div>
                        <div className="stat-label">Avg. CTR</div>
                        <div className="stat-value">2.4%</div>
                    </div>
                </div>

                <div className="card stat-card">
                    <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}><BarChart2 size={24} /></div>
                    <div>
                        <div className="stat-label">Total Spend</div>
                        <div className="stat-value">$12,450</div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Performance Chart */}
                <div className="card">
                    <h3 className="mb-6">Weekly Performance</h3>
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer>
                            <LineChart data={performanceData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.2} />
                                <XAxis dataKey="name" stroke="var(--text-main)" tick={{ fontWeight: 600 }} />
                                <YAxis stroke="var(--text-main)" tick={{ fontWeight: 600 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ fontWeight: 700 }} />
                                <Line type="monotone" dataKey="impressions" stroke="var(--primary)" strokeWidth={4} activeDot={{ r: 8, stroke: 'var(--border)', strokeWidth: 2 }} />
                                <Line type="monotone" dataKey="clicks" stroke="var(--secondary)" strokeWidth={4} activeDot={{ r: 8, stroke: 'var(--border)', strokeWidth: 2 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Spend Chart */}
                <div className="card">
                    <h3 className="mb-6">Budget vs Spend</h3>
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer>
                            <BarChart data={spendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.2} />
                                <XAxis dataKey="name" stroke="var(--text-main)" tick={{ fontWeight: 600 }} />
                                <YAxis stroke="var(--text-main)" tick={{ fontWeight: 600 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ fontWeight: 700 }} />
                                <Bar dataKey="budget" fill="var(--accent)" stroke="var(--border)" strokeWidth={2} />
                                <Bar dataKey="spent" fill="var(--warning)" stroke="var(--border)" strokeWidth={2} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
