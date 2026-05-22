import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Monitor, User, Megaphone, Lock, Mail, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import Spinner from '../../components/common/Spinner';

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [role, setRole] = useState('advertiser');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        setError('');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            toast.error("Passwords do not match");
            return;
        }

        setIsLoading(true);
        const result = await register(name, email, password, role);

        if (result.success) {
            toast.success(`Successfully registered and logged in as ${role}!`);
            if (role === 'advertiser') {
                navigate('/advertiser/dashboard');
            } else {
                navigate('/owner/dashboard');
            }
        } else {
            setError(result.error);
            toast.error(result.error || "Registration failed");
        }
        setIsLoading(false);
    };

    return (
        <div className="container animate-fade-in flex items-center justify-center pt-20" style={{ minHeight: '80vh' }}>
            <div className="card auth-card">
                
                <div className="text-center mb-8">
                    <Monitor size={48} className="text-primary mb-4 mx-auto" style={{ margin: '0 auto 1rem' }} />
                    <h2>Create Account</h2>
                    <p>Join BBO. to list or book spaces</p>
                </div>

                {error && (
                    <div className="badge badge-warning w-full mb-6 p-3" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', width: '100%', borderRadius: 'var(--radius-md)' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister}>
                    <div className="split-layout-container">
                        {/* Left Column - Roles Column */}
                        <div>
                            <div className="form-group mb-6">
                                <label className="form-label" style={{ marginBottom: '1rem' }}>Select Role</label>
                                <div className="grid grid-cols-1 gap-3">
                                    <label
                                        className={`card p-3 flex items-center gap-3 cursor-pointer transition ${role === 'advertiser' ? 'border-primary' : ''}`}
                                        style={{ borderColor: role === 'advertiser' ? 'var(--primary)' : 'var(--border)', padding: '0.75rem' }}
                                        onClick={() => handleRoleSelect('advertiser')}
                                    >
                                        <div style={{ width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: role === 'advertiser' ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.05)', color: role === 'advertiser' ? 'var(--primary)' : 'var(--text-muted)' }}>
                                            <Megaphone size={20} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: '0.9rem', margin: 0 }}>Advertiser</h3>
                                        </div>
                                        {role === 'advertiser' && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--primary)' }}></div>}
                                    </label>

                                    <label
                                        className={`card p-3 flex items-center gap-3 cursor-pointer transition ${role === 'owner' ? 'border-primary' : ''}`}
                                        style={{ borderColor: role === 'owner' ? 'var(--primary)' : 'var(--border)', padding: '0.75rem' }}
                                        onClick={() => handleRoleSelect('owner')}
                                    >
                                        <div style={{ width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: role === 'owner' ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.05)', color: role === 'owner' ? 'var(--primary)' : 'var(--text-muted)' }}>
                                            <User size={20} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: '0.9rem', margin: 0 }}>Media Owner</h3>
                                        </div>
                                        {role === 'owner' && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--primary)' }}></div>}
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Credentials Column */}
                        <div className="split-layout-divider flex flex-col justify-between">
                            <div>
                                <div className="form-group mb-4">
                                    <label className="form-label">Full Name</label>
                                    <div style={{ position: 'relative' }}>
                                        <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                        <input
                                            type="text"
                                            className="form-input"
                                            style={{ paddingLeft: '2.5rem' }}
                                            placeholder="John Doe"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group mb-4">
                                    <label className="form-label">Email Address</label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                        <input
                                            type="email"
                                            className="form-input"
                                            style={{ paddingLeft: '2.5rem' }}
                                            placeholder="john@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group mb-4">
                                    <label className="form-label">Password</label>
                                    <div style={{ position: 'relative' }}>
                                        <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                        <input
                                            type="password"
                                            className="form-input"
                                            style={{ paddingLeft: '2.5rem' }}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group mb-8">
                                    <label className="form-label">Confirm Password</label>
                                    <div style={{ position: 'relative' }}>
                                        <ShieldCheck size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                        <input
                                            type="password"
                                            className="form-input"
                                            style={{ paddingLeft: '2.5rem' }}
                                            placeholder="••••••••"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="btn btn-primary w-full mb-6" style={{ padding: '0.875rem' }} disabled={isLoading}>
                                    {isLoading ? <Spinner size="sm" color="white" /> : 'Sign Up'}
                                </button>

                                <div className="text-center">
                                    <p style={{ fontSize: '0.9rem', margin: 0 }}>
                                        Already have an account?{' '}
                                        <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 750, textDecoration: 'underline' }}>
                                            Sign In
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
