"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './admin-login.css';

export default function AdminLogin() {
    const [credentials, setCredentials] = useState({ id: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Hardcoded simple admin credentials
        setTimeout(() => {
            if (credentials.id === 'admin' && credentials.password === 'AdminPass2026') {
                // Set a simple flag in localStorage to mock authentication
                localStorage.setItem('adminAuthorized', 'true');
                router.push('/admin/dashboard');
            } else {
                setError('Invalid Admin ID or Password');
                setLoading(false);
            }
        }, 800);
    };

    return (
        <div className="admin-login-page chess-pattern screen-center">
            <div className="container center" style={{ maxWidth: '500px' }}>
                <div className="glass-panel admin-panel-box animate-fade-in">

                    <div className="admin-header">
                        <div className="admin-icon">🛡️</div>
                        <h2>Admin Portal Access</h2>
                        <p>Secure login for academy administrators only.</p>
                    </div>

                    <form onSubmit={handleLogin} className="admin-form text-left">

                        <div className="input-group">
                            <label className="input-label" htmlFor="adminId">Admin ID</label>
                            <input
                                type="text"
                                id="adminId"
                                className="input-field"
                                value={credentials.id}
                                onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}
                                required
                                placeholder="Enter Admin ID"
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="input-field"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                required
                                placeholder="Enter Secure Password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary full-width mt-1"
                            disabled={loading}
                        >
                            {loading ? 'Authenticating...' : 'Secure Login'}
                        </button>
                        <div className="mt-1" style={{ fontSize: '0.8rem', color: '#a1a1aa', textAlign: 'center' }}>
                         
                        </div>

                        {error && (
                            <div className="form-msg error-msg center">{error}</div>
                        )}

                    </form>

                </div>
            </div>
        </div>
    );
}
