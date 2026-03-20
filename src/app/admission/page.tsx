"use client";

import { useState } from 'react';
import './admission.css';

export default function AdmissionPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        country: '',
    });
    const [file, setFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage({ type: '', text: '' });

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('fullName', formData.fullName);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('country', formData.country);
            if (file) {
                formDataToSend.append('paymentScreenshot', file);
            }

            const res = await fetch('/api/admission', {
                method: 'POST',
                body: formDataToSend,
            });

            if (res.ok) {
                setMessage({ type: 'success', text: 'Application Submitted Successfully' });
                setFormData({ fullName: '', email: '', phone: '', country: '' });
                setFile(null);
            } else {
                const data = await res.json();
                setMessage({ type: 'error', text: data.error || 'Failed to submit application.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="admission-page">
            <div className="container">
                <div className="admission-header text-center">
                    <h1 className="section-title">Admission Form</h1>
                    <p className="section-subtitle">Join V64chessclub and start your journey to becoming a Grandmaster.</p>
                </div>

                <div className="admission-grid">
                    <div className="admission-form-container glass-panel">
                        <form onSubmit={handleSubmit} className="admission-form">
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter your country"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="paymentScreenshot">Upload Payment Screenshot</label>
                                <input
                                    type="file"
                                    id="paymentScreenshot"
                                    name="paymentScreenshot"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    required
                                />
                                <small className="form-help">Please upload a screenshot of your payment confirmation.</small>
                            </div>

                            <button type="submit" className="btn btn-primary full-width" disabled={submitting}>
                                {submitting ? 'Submitting...' : 'Submit Application'}
                            </button>

                            {message.text && (
                                <div className={`form-message ${message.text === 'Application Submitted Successfully' ? 'success' : 'error'}`}>
                                    {message.text}
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="payment-details-container glass-panel">
                        <h3>Payment Details</h3>
                        <p>Please make the payment to the following UPI ID or scan the QR code below.</p>

                        <div className="upi-details">
                            <div className="detail-item">
                                <strong>UPI ID:</strong>
                                <span>7770031738@ybl</span>
                            </div>
                            <div className="detail-item">
                                <strong>Account Name:</strong>
                                <span>Vaibhav Badgujar</span>
                            </div>
                        </div>

                        <div className="qr-code-section">
                            <div className="qr-box">
                                <img src="/qr.jpeg" alt="PhonePe QR Code" className="qr-image" />
                            </div>
                            <p className="qr-hint">Scan to Pay</p>
                        </div>

                        <div className="payment-instructions">
                            <h4>Instructions:</h4>
                            <ul>
                                <li>Make the payment via any UPI app (GPay, PhonePe, Paytm, etc.).</li>
                                <li>Take a clear screenshot of the successful transaction.</li>
                                <li>Upload the screenshot in the form on the left.</li>
                                <li>Your admission will be confirmed after payment verification.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
