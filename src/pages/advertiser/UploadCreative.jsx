import React, { useState } from 'react';
import { Upload, FileImage, Link as LinkIcon, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UploadCreative() {
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState('');
    const [formData, setFormData] = useState({
        creativeName: '',
        targetUrl: '',
        dimensions: '1920x1080',
        notes: ''
    });

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFileName(e.dataTransfer.files[0].name);
            toast.success('File attached successfully');
        }
    };

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
            toast.success('File attached successfully');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!fileName) {
            toast.error('Please attach a creative file.');
            return;
        }
        toast.success('Creative uploaded successfully! Awaiting approval.');
        setFileName('');
        setFormData({ creativeName: '', targetUrl: '', dimensions: '1920x1080', notes: '' });
    };

    return (
        <div className="animate-fade-in">
            <div className="flex items-center gap-4 mb-8">
                <div className="stat-icon"><Upload size={24} /></div>
                <h1 style={{ margin: 0 }}>Upload Creative</h1>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="card">
                    <h3 className="mb-6">Creative Details</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Creative Name</label>
                            <input 
                                type="text" 
                                className="form-input" 
                                name="creativeName"
                                placeholder="e.g. Summer Sale Banner" 
                                value={formData.creativeName}
                                onChange={handleChange}
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Target URL</label>
                            <div style={{ position: 'relative' }}>
                                <LinkIcon size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input 
                                    type="url" 
                                    className="form-input" 
                                    name="targetUrl"
                                    placeholder="https://example.com/promo" 
                                    style={{ paddingLeft: '2.5rem' }}
                                    value={formData.targetUrl}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Dimensions</label>
                            <select className="form-input" name="dimensions" value={formData.dimensions} onChange={handleChange}>
                                <option value="1920x1080">1920 x 1080 (Landscape)</option>
                                <option value="1080x1920">1080 x 1920 (Portrait)</option>
                                <option value="1440x400">1440 x 400 (Billboard Wide)</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Additional Notes</label>
                            <textarea 
                                className="form-input" 
                                name="notes"
                                rows="3" 
                                placeholder="Any special instructions for approval..."
                                value={formData.notes}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary w-full mt-4">
                            <Save size={18} /> Submit Creative
                        </button>
                    </form>
                </div>

                {/* Upload Section */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3 className="mb-6">File Upload</h3>
                    <div 
                        className="flex-1 flex flex-col items-center justify-center p-8"
                        style={{
                            border: `var(--border-width) dashed ${isDragging ? 'var(--primary)' : 'var(--border)'}`,
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: isDragging ? 'rgba(67, 56, 202, 0.05)' : 'var(--bg-main)',
                            transition: 'var(--transition)',
                            cursor: 'pointer',
                            minHeight: '300px'
                        }}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('file-upload').click()}
                    >
                        <input 
                            id="file-upload" 
                            type="file" 
                            className="hidden" 
                            accept="image/*,video/*" 
                            onChange={handleFileInput}
                            style={{ display: 'none' }}
                        />
                        
                        <div className="stat-icon mb-4" style={{ background: 'var(--accent)', width: '5rem', height: '5rem' }}>
                            {fileName ? <FileImage size={32} /> : <Upload size={32} />}
                        </div>
                        
                        <h3 className="text-center mb-2">
                            {fileName ? 'File Selected' : 'Drag & Drop File'}
                        </h3>
                        <p className="text-center mb-0">
                            {fileName ? (
                                <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>{fileName}</span>
                            ) : (
                                "or click to browse from your computer"
                            )}
                        </p>
                        
                        {!fileName && (
                            <div className="mt-6">
                                <span className="badge badge-secondary mx-1">JPEG</span>
                                <span className="badge badge-secondary mx-1">PNG</span>
                                <span className="badge badge-secondary mx-1">MP4</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
