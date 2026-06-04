import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Plus, MapPin, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from '../../components/common/Spinner';

export default function ManageAdSpaces() {
    const [spaces, setSpaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [spaceToDelete, setSpaceToDelete] = useState(null);

    useEffect(() => {
        fetchSpaces();
    }, []);

    const fetchSpaces = async () => {
        try {
            const response = await api.get('/adspaces/?mine=true');
            setSpaces(response.data.results || response.data);
        } catch (error) {
            console.error("Error fetching ad spaces:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/adspaces/${id}/`);
            toast.success("Ad space deleted successfully");
            setSpaceToDelete(null);
            fetchSpaces();
        } catch (error) {
            toast.error("Failed to delete ad space. It might have active bookings.");
            setSpaceToDelete(null);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1>Manage Ad Spaces</h1>
                    <p>Edit or update your billboard inventory.</p>
                </div>
                <Link to="/owner/add-adspace" className="btn btn-primary flex items-center gap-2">
                    <Plus size={18} /> Add New Space
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-full flex justify-center py-20">
                        <Spinner size="lg" />
                    </div>
                ) : (
                    spaces.map(space => (
                        <div key={space.id} className="card p-0 overflow-hidden group">
                            <div style={{ position: 'relative' }}>
                                <img 
                                    src={space.image || `https://images.unsplash.com/photo-1542289139-441639c0d4dd?auto=format&fit=crop&q=80&w=800`} 
                                    alt={space.location} 
                                    style={{ width: '100%', height: '160px', objectFit: 'cover' }} 
                                />
                                <span className={`badge ${space.availabilityStatus === 'available' ? 'badge-success' : 'badge-warning'}`} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                                    {space.availabilityStatus}
                                </span>
                            </div>
                            
                            <div style={{ padding: '1.25rem' }}>
                                <h3 className="mb-1" style={{ fontSize: '1.1rem' }}>{space.location}</h3>
                                <p className="flex items-center gap-1 text-sm text-muted mb-4">
                                    <MapPin size={14} /> {space.city}
                                </p>
                                
                                <div className="flex justify-between items-center pt-4 border-t" style={{ borderTop: '1px solid var(--border)' }}>
                                    <div>
                                        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>${parseFloat(space.basePricePerDay).toLocaleString()}</span>
                                        <span className="text-xs text-muted"> / day</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link 
                                            to={`/owner/edit-adspace/${space.id}`}
                                            className="btn btn-secondary" 
                                            style={{ padding: '6px', borderRadius: 'var(--radius-sm)' }}
                                        >
                                            <Edit2 size={16} />
                                        </Link>
                                        <button 
                                            onClick={() => setSpaceToDelete(space.id)}
                                            className="btn" 
                                            style={{ padding: '6px', borderRadius: 'var(--radius-sm)', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                
                {!isLoading && spaces.length === 0 && (
                    <div className="col-span-full text-center py-20 bg-panel rounded border-dashed border-2">
                        <p className="text-muted">You haven't added any ad spaces yet.</p>
                        <Link to="/owner/add-adspace" className="text-primary font-bold">Add your first space now</Link>
                    </div>
                )}
            </div>

            {spaceToDelete && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                    <div className="bg-panel border-2 border-black rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl" style={{ backgroundColor: 'var(--bg-panel)', border: '2px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '1.5rem', maxWidth: '400px', width: '100%', boxShadow: 'var(--shadow-md)' }}>
                        <h3 className="mb-2 text-xl font-bold">Delete Ad Space</h3>
                        <p className="mb-6 text-muted">Are you sure you want to delete this ad space? This action cannot be undone.</p>
                        <div className="flex justify-end gap-3">
                            <button 
                                className="btn btn-secondary" 
                                onClick={() => setSpaceToDelete(null)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="btn btn-danger" 
                                onClick={() => handleDelete(spaceToDelete)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
