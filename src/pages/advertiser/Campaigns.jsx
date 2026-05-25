import React, { useState } from 'react';
import { Layers, Plus, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Campaigns() {
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data for campaigns
    const campaigns = [
        { id: 'CMP-001', name: 'Summer Blast Sale', status: 'Active', budget: 15000, spent: 4500, startDate: '2026-06-01', endDate: '2026-08-31' },
        { id: 'CMP-002', name: 'Q3 Brand Awareness', status: 'Draft', budget: 50000, spent: 0, startDate: '2026-07-01', endDate: '2026-09-30' },
        { id: 'CMP-003', name: 'Holiday Special Preview', status: 'Completed', budget: 20000, spent: 20000, startDate: '2025-11-15', endDate: '2025-12-31' },
    ];

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <div className="stat-icon"><Layers size={24} /></div>
                    <h1 style={{ margin: 0 }}>My Campaigns</h1>
                </div>
                <Link to="/search" className="btn btn-primary">
                    <Plus size={18} /> Create Campaign
                </Link>
            </div>

            <div className="card mb-8">
                <div className="flex gap-4 mb-6">
                    <div className="flex-1" style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input 
                            type="text" 
                            className="form-input" 
                            placeholder="Search campaigns..." 
                            style={{ paddingLeft: '2.5rem' }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-secondary">
                        <Filter size={18} /> Filter
                    </button>
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Campaign ID</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Budget</th>
                                <th>Spent</th>
                                <th>Dates</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map((campaign) => (
                                <tr key={campaign.id}>
                                    <td style={{ fontWeight: 700, color: 'var(--text-muted)' }}>{campaign.id}</td>
                                    <td style={{ fontWeight: 800 }}>{campaign.name}</td>
                                    <td>
                                        <span className={`badge ${campaign.status === 'Active' ? 'badge-success' : campaign.status === 'Completed' ? 'badge-secondary' : 'badge-warning'}`}>
                                            {campaign.status}
                                        </span>
                                    </td>
                                    <td>${campaign.budget.toLocaleString()}</td>
                                    <td>${campaign.spent.toLocaleString()}</td>
                                    <td>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                            {campaign.startDate} to {campaign.endDate}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {campaigns.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-8">No campaigns found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
