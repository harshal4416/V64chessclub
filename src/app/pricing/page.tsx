import Link from 'next/link';
import './pricing.css';

export default function Pricing() {
    return (
        <div className="pricing-page">
            <section className="page-header section chess-pattern">
                <div className="container center animate-fade-in">
                    <div className="badge">Membership Plans</div>
                    <h1 className="page-title">Invest in Your <span className="highlight">Mastery</span></h1>
                    <p className="page-subtitle">Choose the plan that fits your current rating and future ambitions. All plans include 24/7 access to our online curriculum.</p>
                </div>
            </section>

            <section className="section pricing-content">
                <div className="container">
                    <div className="pricing-grid">

                        {/* Basic Plan */}
                        <div className="glass-panel pricing-card">
                            <div className="pricing-header">
                                <h3>Club Member</h3>
                                <p className="plan-desc">For casual players aiming for club level (U1500)</p>
                                <div className="price">
                                    <span className="currency">$</span>
                                    <span className="amount">49</span>
                                    <span className="period">/mo</span>
                                </div>
                            </div>
                            <div className="pricing-body">
                                <ul className="pricing-features">
                                    <li>Access to basic video library</li>
                                    <li>1 Group Masterclass per month</li>
                                    <li>Weekly club tournaments</li>
                                    <li>Community forum access</li>
                                    <li className="disabled">1-on-1 Grandmaster Coaching</li>
                                    <li className="disabled">Premium engine analysis</li>
                                </ul>
                                <Link href="/free-trial" className="btn btn-secondary full-width">Start 1 Day Free Demo</Link>
                            </div>
                        </div>

                        {/* Premium Plan */}
                        <div className="glass-panel pricing-card popular">
                            <div className="popular-badge">Most Popular</div>
                            <div className="pricing-header">
                                <h3>Tournament Pro</h3>
                                <p className="plan-desc">For serious competitors (1500 - 2000)</p>
                                <div className="price">
                                    <span className="currency">$</span>
                                    <span className="amount">149</span>
                                    <span className="period">/mo</span>
                                </div>
                            </div>
                            <div className="pricing-body">
                                <ul className="pricing-features">
                                    <li>Full access to premium library</li>
                                    <li>4 Group Masterclasses per month</li>
                                    <li>Free entry to prize tournaments</li>
                                    <li>Premium engine analysis</li>
                                    <li>Personalized study plan</li>
                                    <li className="disabled">1-on-1 Grandmaster Coaching</li>
                                </ul>
                                <Link href="/free-trial" className="btn btn-primary full-width">Join Now</Link>
                            </div>
                        </div>

                        {/* Elite Plan */}
                        <div className="glass-panel pricing-card elite">
                            <div className="pricing-header">
                                <h3>Grandmaster</h3>
                                <p className="plan-desc">For aspiring titled players (2000+)</p>
                                <div className="price">
                                    <span className="currency">$</span>
                                    <span className="amount">499</span>
                                    <span className="period">/mo</span>
                                </div>
                            </div>
                            <div className="pricing-body">
                                <ul className="pricing-features">
                                    <li>Everything in Tournament Pro</li>
                                    <li>4 hrs/mo 1-on-1 GM Coaching</li>
                                    <li>Direct WhatsApp line to assigned GM</li>
                                    <li>Pre-tournament psychological prep</li>
                                    <li>Deep opening repertoire building</li>
                                    <li>FIDE tournament planning</li>
                                </ul>
                                <Link href="/contact" className="btn btn-secondary full-width cta-elite">Inquire Now</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
