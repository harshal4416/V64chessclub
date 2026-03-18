"use client";

import { useState } from 'react';
import './contact.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<null | 'submitting' | 'success' | 'error'>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="contact-page">
            <section className="page-header section chess-pattern">
                <div className="container center animate-fade-in">
                    <div className="badge">Get in Touch</div>
                    <h1 className="page-title">Contact <span className="highlight">Us</span></h1>
                    <p className="page-subtitle">Whether you have a question about our programs, pricing, or coaching, our team is ready to answer all your questions.</p>
                </div>
            </section>

            <section className="section contact-content">
                <div className="container contact-container">

                    <div className="contact-info">
                        <div className="glass-panel contact-card">
                            <div className="contact-icon">📍</div>
                            <h3>Visit Us</h3>
                            <p>Vinayak Nagar, Samarth Nagar, New Sangavi, Pimpri-Chinchwad, Pune, Maharashtra 411027</p>
                            <a href="https://maps.app.goo.gl/fSJB3Y8bypEXE6Ju6?g_st=ic" target="_blank" rel="noopener noreferrer" className="map-link" style={{ display: 'inline-block', marginTop: '10px', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold' }}>
                                View on Google Maps ↗
                            </a>
                        </div>

                        <div className="glass-panel contact-card">
                            <div className="contact-icon">📞</div>
                            <h3>Call Us</h3>
                            <p>+91 8010355685, 9049035487<br /></p>
                        </div>

                        <div className="glass-panel contact-card">
                            <div className="contact-icon">✉️</div>
                            <h3>Email Us</h3>
                            <p>V64chessclub@gmail.com</p>
                        </div>
                    </div>

                    <div className="glass-panel feedback-form-container">
                        <h2>Send Feedback or Inquiries</h2>
                        <p className="form-desc">Fill out the form below and we will get back to you within 24 hours.</p>

                        <form onSubmit={handleSubmit} className="feedback-form">
                            <div className="input-group">
                                <label className="input-label" htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="input-field"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    placeholder="Magnus Carlsen"
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label" htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="input-field"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    placeholder="magnus@chess.com"
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label" htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    className="input-field textarea"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    placeholder="How can we help you today?"
                                    rows={5}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary submit-btn full-width"
                                disabled={status === 'submitting'}
                            >
                                {status === 'submitting' ? 'Sending...' : 'Send Message'}
                            </button>

                            {status === 'success' && (
                                <div className="form-msg success-msg">Your message has been sent successfully.</div>
                            )}
                            {status === 'error' && (
                                <div className="form-msg error-msg">Something went wrong. Please try again.</div>
                            )}
                        </form>
                    </div>

                </div>
            </section>
        </div>
    );
}
