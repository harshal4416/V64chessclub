"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import './dashboard.css';

type FreeTrial = {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    country: string;
    status: 'Pending' | 'Accepted' | 'Rejected';
    createdAt: string;
};

type Admission = {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    country: string;
    paymentScreenshot?: string;
    proofUrl?: string;
    status: 'Pending' | 'Accepted' | 'Rejected';
    createdAt: string;
};

type Feedback = {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
};

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'trials' | 'feedback' | 'admissions'>('trials');
    const [trials, setTrials] = useState<FreeTrial[]>([]);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [admissions, setAdmissions] = useState<Admission[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<string | null>(null);

    useEffect(() => {
        const isAuth = localStorage.getItem('adminAuthorized');
        if (!isAuth) {
            router.push('/admin');
            return;
        }

        let isMounted = true;
        const loadData = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/admin/data');
                if (res.ok && isMounted) {
                    const data = await res.json();
                    setTrials(data.trials || []);
                    setFeedbacks(data.feedbacks || []);
                    setAdmissions(data.admissions || []);
                }
            } catch (e) {
                console.error("Failed to fetch admin data", e);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadData();
        return () => { isMounted = false; };
    }, [router]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/data');
            if (res.ok) {
                const data = await res.json();
                setTrials(data.trials || []);
                setFeedbacks(data.feedbacks || []);
                setAdmissions(data.admissions || []);
            }
        } catch (e) {
            console.error("Failed to fetch admin data", e);
        }
        setLoading(false);
    };

    const handleStatusUpdate = async (id: string, type: 'trial' | 'admission', status: 'Accepted' | 'Rejected') => {
        if (!confirm(`Are you sure you want to change status to ${status}?`)) return;

        setProcessingId(id);
        try {
            const res = await fetch('/api/admin/data', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, type, status })
            });

            if (res.ok) {
                if (type === 'trial') {
                    setTrials(trials.map(t => t.id === id ? { ...t, status } : t));
                } else {
                    setAdmissions(admissions.map(a => a.id === id ? { ...a, status } : a));
                }
            } else {
                alert("Failed to update status.");
            }
        } catch (e) {
            console.error("Failed to update status", e);
        } finally {
            setProcessingId(null);
        }
    };

    const handleDelete = async (type: 'trial' | 'feedback' | 'admission', id: string) => {
        if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

        try {
            const res = await fetch(`/api/admin/data?type=${type}&id=${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                if (type === 'trial') {
                    setTrials(trials.filter(t => t.id !== id));
                } else if (type === 'admission') {
                    setAdmissions(admissions.filter(a => a.id !== id));
                } else {
                    setFeedbacks(feedbacks.filter(f => f.id !== id));
                }
            } else {
                alert("Failed to delete record.");
            }
        } catch (e) {
            console.error("Failed to delete", e);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAuthorized');
        router.push('/admin');
    };

    if (loading) return <div className="screen-center"><div className="loader">Loading...</div></div>;

    return (
        <div className="admin-dashboard">
            <div className="dashboard-sidebar">
                <div className="sidebar-header">
                    <div className="admin-avatar">A</div>
                    <div>
                        <h3>Admin Portal</h3>
                        <span className="status-online">● Online</span>
                    </div>
                </div>

                <nav className="dashboard-nav">
                    <button
                        className={`nav-btn ${activeTab === 'trials' ? 'active' : ''}`}
                        onClick={() => setActiveTab('trials')}
                    >
                        📋 Free Trial Leads
                        <span className="badge-count">{trials.length}</span>
                    </button>

                    <button
                        className={`nav-btn ${activeTab === 'admissions' ? 'active' : ''}`}
                        onClick={() => setActiveTab('admissions')}
                    >
                        🎓 Admissions
                        <span className="badge-count">{admissions.length}</span>
                    </button>

                    <button
                        className={`nav-btn ${activeTab === 'feedback' ? 'active' : ''}`}
                        onClick={() => setActiveTab('feedback')}
                    >
                        ✉️ Feedback Messages
                        <span className="badge-count">{feedbacks.length}</span>
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button className="btn btn-secondary full-width logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="dashboard-main">
                <div className="dashboard-header">
                    <h1>
                        {activeTab === 'trials' ? 'Free Trial Applications' :
                            activeTab === 'admissions' ? 'Admission Applications' :
                                'Feedback & Inquiries'}
                    </h1>
                    <button className="btn btn-primary btn-sm" onClick={fetchData}>↻ Refresh Data</button>
                </div>

                <div className="glass-panel table-container">
                    {activeTab === 'trials' ? (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trials.length === 0 ? (
                                    <tr><td colSpan={7} className="empty-state">No free trial submissions found.</td></tr>
                                ) : (
                                    trials.map(t => (
                                        <tr key={t.id}>
                                            <td title={t.id}>#{t.id.slice(0, 6)}...</td>
                                            <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                                            <td className="font-medium">{t.fullName}</td>
                                            <td><a href={`mailto:${t.email}`}>{t.email}</a></td>
                                            <td>{t.phone}</td>
                                            <td>
                                                <span className={`status-badge ${t.status?.toLowerCase()}`}>
                                                    {t.status || 'Pending'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-btns">
                                                    <button
                                                        className="action-btn accept"
                                                        onClick={() => handleStatusUpdate(t.id, 'trial', 'Accepted')}
                                                        disabled={processingId === t.id}
                                                    >✓</button>
                                                    <button
                                                        className="action-btn reject"
                                                        onClick={() => handleStatusUpdate(t.id, 'trial', 'Rejected')}
                                                        disabled={processingId === t.id}
                                                    >×</button>
                                                    <button className="action-btn delete" onClick={() => handleDelete('trial', t.id)}>🗑</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    ) : activeTab === 'admissions' ? (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Full Name</th>
                                    <th>Contact</th>
                                    <th>Payment Proof</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admissions.length === 0 ? (
                                    <tr><td colSpan={7} className="empty-state">No admission applications found.</td></tr>
                                ) : (
                                    admissions.map(a => (
                                        <tr key={a.id}>
                                            <td title={a.id}>#{a.id.slice(0, 6)}...</td>
                                            <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                                            <td className="font-medium">{a.fullName}</td>
                                            <td>
                                                <small>{a.email}</small><br />
                                                <small>{a.phone}</small>
                                            </td>
                                            <td>
                                                <a href={a.proofUrl || a.paymentScreenshot} target="_blank" rel="noopener noreferrer" className="view-link">
                                                    👁 View Proof
                                                </a>
                                            </td>
                                            <td>
                                                <span className={`status-badge ${a.status.toLowerCase()}`}>
                                                    {a.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-btns">
                                                    <button
                                                        className="action-btn accept"
                                                        onClick={() => handleStatusUpdate(a.id, 'admission', 'Accepted')}
                                                        disabled={processingId === a.id}
                                                    >✓</button>
                                                    <button
                                                        className="action-btn reject"
                                                        onClick={() => handleStatusUpdate(a.id, 'admission', 'Rejected')}
                                                        disabled={processingId === a.id}
                                                    >×</button>
                                                    <button className="action-btn delete" onClick={() => handleDelete('admission', a.id)}>🗑</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th className="msg-col">Message</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedbacks.length === 0 ? (
                                    <tr><td colSpan={6} className="empty-state">No feedback messages found.</td></tr>
                                ) : (
                                    feedbacks.map(f => (
                                        <tr key={f.id}>
                                            <td title={f.id}>#{f.id.slice(0, 6)}...</td>
                                            <td>{new Date(f.createdAt).toLocaleDateString()}</td>
                                            <td className="font-medium">{f.name}</td>
                                            <td><a href={`mailto:${f.email}`}>{f.email}</a></td>
                                            <td className="msg-cell">{f.message}</td>
                                            <td>
                                                <button className="action-btn delete" onClick={() => handleDelete('feedback', f.id)}>🗑</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
