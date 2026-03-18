"use client";

import { useState } from 'react';
import Link from 'next/link';
import './free-trial.css';

const COUNTRIES = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia",
    "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
    "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
    "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia", "Democratic Republic of the Congo",
    "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
    "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece",
    "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia",
    "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait",
    "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
    "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia",
    "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia",
    "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
    "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
    "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
    "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka",
    "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga",
    "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
    "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export default function FreeTrial() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        country: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<null | 'submitting' | 'success' | 'error'>(null);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) newErrors.email = 'Valid email is required';

        // Exactly 10 digits validation
        const phoneDigits = formData.phone.replace(/\D/g, '');
        if (phoneDigits.length !== 10) {
            newErrors.phone = 'Phone number must be exactly 10 digits';
        }

        if (!formData.country) newErrors.country = 'Please select a country';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setStatus('submitting');

        try {
            // Strip out non-digits for clean DB storage
            const cleanPhone = formData.phone.replace(/\D/g, '');
            const payload = { ...formData, phone: cleanPhone };

            const response = await fetch('/api/free-trial', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ fullName: '', email: '', phone: '', country: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow numbers and common formatting characters during input
        const val = e.target.value;
        if (/^[\d\s()+-]*$/.test(val)) {
            setFormData({ ...formData, phone: val });
        }
    };

    if (status === 'success') {
        return (
            <div className="free-trial-page section chess-pattern screen-center">
                <div className="container">
                    <div className="glass-panel success-panel center animate-fade-in">
                        <div className="success-icon">🏆</div>
                        <h2>Registration Successful!</h2>
                        <p>Welcome to V64chessclub. We have received your application for a 1-day free demo.</p>
                        <p>Please check your email <strong>{formData.email}</strong> for instructions on how to access our premium resources and schedule your first group masterclass.</p>
                        <Link href="/" className="btn btn-primary mt-xl">Return to Homepage</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="free-trial-page">
            <section className="section trial-content chess-pattern">
                <div className="container trial-container">

                    <div className="trial-info animate-fade-in">
                        <div className="badge mb-1">Limited Time Offer</div>
                        <h1 className="trial-title">Start Your <span className="highlight">1-Day Free Demo</span></h1>
                        <p className="trial-desc">
                            Experience what it means to train like a Grandmaster. No credit card required to sign up.
                            Get full access to our &apos;Tournament Pro&apos; tier features for your demo day.
                        </p>

                        <ul className="trial-features">
                            <li>
                                <span className="icon">🎥</span>
                                <span>Full access to the Premium Video Library</span>
                            </li>
                            <li>
                                <span className="icon">👨‍🏫</span>
                                <span>Attend one live Group Masterclass</span>
                            </li>
                            <li>
                                <span className="icon">💻</span>
                                <span>Unlimited Premium Engine Analysis</span>
                            </li>
                            <li>
                                <span className="icon">🗣️</span>
                                <span>Access to the members-only Discord</span>
                            </li>
                        </ul>
                    </div>

                    <div className="glass-panel trial-form-panel animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <h2>Register Now</h2>
                        <p className="form-sub">Join thousands of players taking their game to the next level.</p>

                        <form onSubmit={handleSubmit} className="trial-form" noValidate>

                            <div className="input-group">
                                <label className="input-label" htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    className={`input-field ${errors.fullName ? 'error-border' : ''}`}
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    placeholder="Bobby Fischer"
                                />
                                {errors.fullName && <span className="input-error">{errors.fullName}</span>}
                            </div>

                            <div className="input-group">
                                <label className="input-label" htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className={`input-field ${errors.email ? 'error-border' : ''}`}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="bobby@chess.com"
                                />
                                {errors.email && <span className="input-error">{errors.email}</span>}
                            </div>

                            <div className="input-group">
                                <label className="input-label" htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className={`input-field ${errors.phone ? 'error-border' : ''}`}
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    placeholder="(555) 123-4567"
                                />
                                <span className="input-hint">Must be exactly 10 digits</span>
                                {errors.phone && <span className="input-error">{errors.phone}</span>}
                            </div>

                            <div className="input-group">
                                <label className="input-label" htmlFor="country">Country</label>
                                <select
                                    id="country"
                                    className={`input-field custom-select ${errors.country ? 'error-border' : ''}`}
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                >
                                    <option value="" disabled>Select your country</option>
                                    {COUNTRIES.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                {errors.country && <span className="input-error">{errors.country}</span>}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary submit-btn full-width mt-1"
                                disabled={status === 'submitting'}
                            >
                                {status === 'submitting' ? 'Processing...' : 'Start 1 Day Free Demo'}
                            </button>

                            {status === 'error' && (
                                <div className="form-msg error-msg">An error occurred. Please try again.</div>
                            )}

                            <p className="legal-text">
                                By registering, you agree to our Terms of Service and Privacy Policy. Your data is secure and will never be shared.
                            </p>
                        </form>
                    </div>

                </div>
            </section>
        </div>
    );
}
