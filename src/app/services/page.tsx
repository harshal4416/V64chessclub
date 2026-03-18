import Link from 'next/link';
import './services.css';

export default function Services() {
    return (
        <div className="services-page">
            <section className="page-header section chess-pattern">
                <div className="container center animate-fade-in">
                    <div className="badge">What We Offer</div>
                    <h1 className="page-title">Elite Chess <span className="highlight">Services</span></h1>
                    <p className="page-subtitle">From absolute beginners to Grandmaster aspirants, we provide the tools and coaching you need to succeed.</p>
                </div>
            </section>

            <section className="section services-content">
                <div className="container">
                    <div className="service-row reverse">
                        <div className="service-info glass-panel">
                            <div className="service-icon">♚</div>
                            <h2>The Trial Demo Class</h2>
                            <p>The trial Demo class is free. The session enables you to get a sense of V64chessclub instructional methods before enrolling your child. It also helps the Academy establish.</p>
                            <ul className="service-features">
                                <li>Personalized learning roadmap</li>
                                <li>Deep game analysis (Engine + Master evaluation)</li>
                                <li>Psychological tournament preparation</li>
                            </ul>
                            <Link href="/contact" className="btn btn-secondary mt-1">Inquire Now</Link>
                        </div>
                        <div className="service-image-placeholder img-1">
                            <img src="/1.jpeg" alt="Private Grandmaster Coaching" />
                        </div>
                    </div>

                    <div className="service-row">
                        <div className="service-info glass-panel">
                            <div className="service-icon">♙</div>
                            <h2>Beginner Program – Foundation Stage</h2>
                            <p>Designed to build correct chess understanding from the start.</p>
                            <ul className="service-features">
                                <li>Complete rules, board vision, and piece coordination</li>
                                <li>Fundamental tactical ideas and mating patterns</li>
                                <li>Opening principles and safe development</li>
                                <li>Thinking process and mistake reduction</li>
                                <li>Supervised games with guided correction</li>
                            </ul>
                        </div>
                        <div className="service-image-placeholder img-2">
                            <img src="/new.jpeg" alt="Group Masterclasses" />
                        </div>
                    </div>
                    <div className="service-row reverse">
                        <div className="service-info glass-panel">
                            <div className="service-icon">♜</div>
                            <h2>Intermediate Program – Development Stage</h2>
                            <p>Designed to transform basic players into structured competitors.</p>
                            <ul className="service-features">
                                <li>Tactical patterns and combination building</li>
                                <li>Opening systems and transition planning</li>
                                <li>Middlegame structures and positional concepts</li>
                                <li>Essential endgames and winning techniques</li>
                                <li>Game analysis and performance improvement</li>
                            </ul>
                        </div>
                        <div className="service-image-placeholder img-3">
                            <img src="/new2.jpeg" alt="Premium Tournaments" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
