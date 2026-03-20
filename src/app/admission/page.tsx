"use client";

import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
    const [receiptData, setReceiptData] = useState<{
        name: string;
        email: string;
        date: string;
        receiptId: string;
        amount: string;
        course: string;
    } | null>(null);
    const receiptRef = useRef<HTMLDivElement>(null);

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
                const rData = {
                    name: formData.fullName,
                    email: formData.email,
                    date: new Date().toLocaleDateString(),
                    receiptId: `V64-${Date.now()}`,
                    amount: "₹500",
                    course: "Chess Training"
                };
                setReceiptData(rData);
                setMessage({ type: 'success', text: 'Application submitted successfully! We will contact you soon.' });
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

    const handleDownloadReceipt = async () => {
        if (!receiptRef.current) return;
        try {
            const canvas = await html2canvas(receiptRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff'
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('V64-Receipt.pdf');
        } catch (error) {
            console.error('Receipt generation error:', error);
            alert('Failed to generate receipt PDF. Please try again.');
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
                                <div className={`form-message ${message.type}`}>
                                    {message.text}
                                </div>
                            )}

                            {receiptData && (
                                <div className="receipt-container mt-4 animate-fade-in" style={{ borderTop: '2px dashed #ccc', paddingTop: '2rem' }}>
                                    <div ref={receiptRef} className="receipt-card" style={{
                                        background: '#ffffff',
                                        color: '#1a1a1a',
                                        padding: '2rem',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                        border: '1px solid #eee'
                                    }}>
                                        <div className="receipt-header" style={{ borderBottom: '2px solid #f0f0f0', paddingBottom: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <img src="/logo.jpeg" alt="V64chessclub Logo" style={{ width: '50px', borderRadius: '4px' }} />
                                                <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#1a1a1a' }}>V64<span style={{ color: '#ebc351' }}>chessclub</span></h2>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <h3 style={{ margin: 0, color: '#333' }}>RECEIPT</h3>
                                                <span style={{ fontSize: '0.8rem', color: '#666' }}>{receiptData.receiptId}</span>
                                            </div>
                                        </div>

                                        <div className="receipt-details" style={{ display: 'grid', gap: '12px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: '#666' }}>Date:</span>
                                                <strong style={{ color: '#1a1a1a' }}>{receiptData.date}</strong>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f9f9f9', paddingTop: '8px' }}>
                                                <span style={{ color: '#666' }}>Student:</span>
                                                <strong style={{ color: '#1a1a1a' }}>{receiptData.name}</strong>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f9f9f9', paddingTop: '8px' }}>
                                                <span style={{ color: '#666' }}>Email:</span>
                                                <strong style={{ color: '#1a1a1a' }}>{receiptData.email}</strong>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f9f9f9', paddingTop: '8px' }}>
                                                <span style={{ color: '#666' }}>Course:</span>
                                                <strong style={{ color: '#1a1a1a' }}>{receiptData.course}</strong>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f9f9f9', paddingTop: '8px', marginTop: '10px' }}>
                                                <span style={{ color: '#666', fontSize: '1.1rem' }}>Amount Paid:</span>
                                                <strong style={{ color: '#1a1a1a', fontSize: '1.1rem' }}>{receiptData.amount}</strong>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #f0f0f0', paddingTop: '12px', marginTop: '5px' }}>
                                                <span style={{ color: '#666' }}>Status:</span>
                                                <strong style={{ color: '#10b981' }}>Paid ✅</strong>
                                            </div>
                                        </div>

                                        <div className="receipt-footer" style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#666' }}>
                                            <p style={{ margin: '4px 0' }}>Founder & Director: Vaibhav Badgujar</p>
                                            <p style={{ margin: '4px 0', fontStyle: 'italic' }}>Thank you for joining our academy!</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleDownloadReceipt}
                                        className="btn btn-secondary full-width mt-2"
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                    >
                                        📄 Download Receipt (PDF)
                                    </button>
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
