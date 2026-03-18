'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import './home.css';
import Testimonials from '@/components/Testimonials';

function Counter({ end, suffix = '', duration = 1000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
}

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero section chess-pattern">
        <div className="container hero-container animate-fade-in">
          <div className="hero-content">
            <div className="badge">Premium Chess Experience</div>
            <h1 className="hero-title">Master the Royal Game at <span className="highlight">V64chessclub</span></h1>
            <p className="hero-subtitle">
              Join an exclusive community of elite players.
            </p>
            <div className="hero-actions">
              <Link href="/free-trial" className="btn btn-primary hero-btn">
                Start Your 1 Day Free Demo
              </Link>
              <Link href="/services" className="btn btn-secondary hero-btn">
                Explore Services
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-value">
                  <Counter end={50} suffix="+" />
                </span>
                <span className="stat-label">Grandmasters</span>
              </div>
              <div className="stat">
                <span className="stat-value">
                  <Counter end={10} suffix="k+" />
                </span>
                <span className="stat-label">Active Members</span>
              </div>
              <div className="stat">
                <span className="stat-value">
                  <Counter end={200} suffix="+" />
                </span>
                <span className="stat-label">Tournaments</span>
              </div>
            </div>
          </div>
          <div className="hero-image-container">
            {/* Visual representation of chess (placeholder with CSS styles) */}
            <div className="glass-board">
              <div className="chess-piece king">♔</div>
              <div className="chess-piece queen">♕</div>
              <div className="chess-piece knight">♘</div>
              <div className="glow-effect"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features section">
        <div className="container">
          <div className="section-header center">
            <h2>Why Choose V64chessclub?</h2>
            <p className="section-desc">    •15+ years of professional coaching experience

•	International academy with students from 12 countries

•	Coaches with global training exposure

•	Structured long-term development system

•	Individual performance tracking

•	Weekly assignments and analysis</p>
          </div>

          <div className="features-grid">
            <div className="glass-panel feature-card">
              <div className="feature-icon">♛</div>
              <h3>Elite Coaching</h3>
              <p>Train under the guidance of FIDE rated Grandmasters tailored to your specific playing style and weaknesses.</p>
            </div>

            <div className="glass-panel feature-card">
              <div className="feature-icon">♜</div>
              <h3>Tournament Readiness</h3>
              <p>Participate in simulated classical and blitz tournaments designed to make you resilient under pressure.</p>
            </div>

            <div className="glass-panel feature-card">
              <div className="feature-icon">♝</div>
              <h3>Comprehensive Curriculum</h3>
              <p>Access our vast library of opening repertoires, middlegame strategies, and endgame mastery courses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="info-block section">
        <div className="container info-grid">
          <div className="info-image-container animate-fade-in">
            <img src="unnamed.jpg" alt="About V64chessclub" className="info-img glass-effect" />
          </div>
          <div className="info-content">
            <h2 className="section-title">ABOUT US</h2>
            <ul className="info-list">
              <li>
                <span className="check-icon">✓</span>
                <p>Our coaching team has experience training students from multiple countries, cultures, and competitive backgrounds. This allows us to deliver a globally adaptive training model aligned with international performance standards.
                </p>

              </li>
              <li>
                <span className="check-icon">✓</span>
                <p>Safe environment for kids (Screening & background checks for Coaches).</p>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <p>To develop disciplined, confident, and strategically refined chess players capable of long-term competitive success.

                  .</p>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <p>Enriched Chess learning with Industry best practices & Innovative Ideas.</p>
              </li>
            </ul>
            <Link href="/free-trial" className="btn btn-primary mt-2">Register Today</Link>
          </div>
        </div>
      </section>

      {/* Unique Section */}
      <section className="info-block section bg-light pt-0">
        <div className="container info-grid reverse">
          <div className="info-content">
            <h2 className="section-title">WHAT MAKES US UNIQUE?</h2>
            <ul className="info-list">
              <li>
                <span className="check-icon">✓</span>
                <p>At V64chessclub, Foundations and pattern recognition. Strategic understanding and middlegame planning</p>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <p>While learning chess, your child benefits from proven teaching methods that blend theory and practice.</p>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <p>Opening preparation and personal repertoire building. Advanced endgames and practical conversion</p>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <p>Tournament strategy and psychological conditioning for high-stakes competition environments.</p>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <p>24/7 dedicated online community access for doubt solving and interactive peer-to-peer learning.</p>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <p>Monthly personalized performance tracking reports and milestone-based skill assessments.</p>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <p>Holistic training including mental health guidance and focus-building exercises for young minds.</p>
              </li>
            </ul>
            <Link href="/free-trial" className="btn btn-secondary mt-2">Take a 1 Day Free Demo</Link>
          </div>
          <div className="info-image-container animate-fade-in">
            <img src="unnamed1.jpg" alt="V64chessclub" className="info-img glass-effect" />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="info-block section">
        <div className="container info-grid">
          <div className="info-image-container animate-fade-in">
            <img src="unnamed4.jpg" alt="Chess for Kids" className="info-img no-glass" />
          </div>
          <div className="info-content">
            <h2 className="section-title">BENEFITS OF CHESS FOR KIDS</h2>
            <ul className="info-list">
              <li>
                <span className="check-icon">✓</span>
                <p>Build and improve your child's listening skills.</p>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <p>Shape critical thinking as your child learns how to evaluate, synthesize and correctly apply knowledge during weekly assignments.</p>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <p>Teach your child how mindset and values affect performance.</p>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <p>Chess tournaments and competitions train your child on Confidence, Creative problem-solving, How to win and accept losing with dignity and understand that actions have consequences.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section">
        <div className="container">
          <div className="glass-panel cta-panel">
            <h2>Ready to make your opening move?</h2>
            <p>Join thousands of members who have already transformed their game.</p>
            <br />
            <Link href="/free-trial" className="btn btn-primary btn-large">
              Claim Your 1 Day Free Demo
            </Link>
          </div>
        </div>
      </section>
      <Testimonials />
    </div>
  );
}
