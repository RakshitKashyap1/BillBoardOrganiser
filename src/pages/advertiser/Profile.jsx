import React, { useState } from 'react';
import { User, Settings, Save, Mail, Briefcase, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
    const { user } = useAuth();
    
    const [formData, setFormData] = useState({
        name: user?.name || 'Advertiser Demo',
        email: user?.email || 'advertiser@bbo.com',
        company: 'Demo Ad Agency Inc.',
        address: '123 Madison Ave, New York, NY',
        phone: '+1 (555) 123-4567'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Profile updated successfully!');
    };

    return (
        <div className="animate-fade-in">
            <div className="flex items-center gap-4 mb-8">
                <div className="stat-icon"><User size={24} /></div>
                <h1 style={{ margin: 0 }}>Advertiser Profile</h1>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                
                {/* Profile Summary Card */}
                <div className="card h-full">
                    <div className="flex flex-col items-center text-center pb-6 border-b mb-6">
                        <div 
                            className="mb-4"
                            style={{
                                width: '100px', height: '100px', 
                                borderRadius: 'var(--radius-pill)', 
                                backgroundColor: 'var(--accent)',
                                border: 'var(--border-width) solid var(--border)',
                                boxShadow: 'var(--shadow-sm)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)'
                            }}
                        >
                            {formData.name.charAt(0)}
                        </div>
                        <h2 style={{ fontSize: '1.5rem', border: 'none', margin: 0, padding: 0 }}>{formData.name}</h2>
                        <span className="badge badge-primary mt-2">Advertiser Account</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <Briefcase size={18} className="text-muted" />
                            <span style={{ fontWeight: 600 }}>{formData.company}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={18} className="text-muted" />
                            <span style={{ fontWeight: 600 }}>{formData.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin size={18} className="text-muted" />
                            <span style={{ fontWeight: 600 }}>{formData.address}</span>
                        </div>
                    </div>
                </div>

                {/* Edit Profile Form */}
                <div className="card md:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <Settings size={20} />
                        <h3 style={{ margin: 0 }}>Edit Information</h3>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input 
                                    type="email" 
                                    className="form-input" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Company Name</label>
                            <input 
                                type="text" 
                                className="form-input" 
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Billing Address</label>
                            <textarea 
                                className="form-input" 
                                name="address"
                                rows="2"
                                value={formData.address}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Phone Number</label>
                            <input 
                                type="tel" 
                                className="form-input" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex justify-end mt-6 pt-6 border-t">
                            <button type="submit" className="btn btn-primary">
                                <Save size={18} /> Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
