import Link from 'next/link';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-container">

                {/* Left Column: Logo & Description */}
                <div className="footer-col">
                    <Link href="/" className="logo-container">
                        <img src="/logo.jpeg" alt="V64chessclub Logo" className="logo-img" />
                        <span className="logo-text">V64chessclub</span>
                    </Link>
                    <p className="footer-desc">
                        Elevating chess mastery through world-class coaching, premium facilities, and an exclusive community of passionate players.
                    </p>
                </div>

                {/* Middle Column 1: Quick Links */}
                <div className="footer-col">
                    <h4 className="footer-heading">Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/services">Our Services</Link></li>
                        <li><Link href="/admission">Admission</Link></li>
                    </ul>
                </div>

                {/* Middle Column 2: Resources */}
                <div className="footer-col">
                    <h4 className="footer-heading">Resources</h4>
                    <ul className="footer-links">
                        <li><Link href="/fees">Fees Structure</Link></li>
                        <li><Link href="/achievements">Achievements</Link></li>
                        <li><Link href="/blog">Academy Blog</Link></li>
                        <li><Link href="/contact">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Right Column: Contact Details */}
                <div className="footer-col">
                    <h4 className="footer-heading">Contact Details</h4>
                    <div className="footer-contact">
                        <p>Founder & Director- Vaibhav Badgujar</p>
                        <p>V64chessclub@gmail.com</p>
                        <p>8010355685</p>
                    </div>
                </div>

            </div>

            <div className="footer-bottom">
                <div className="container footer-bottom-container">
                    <p className="copyright">&copy; {new Date().getFullYear()} V64chessclub. All rights reserved.</p>
                    <div className="footer-legal">
                        <Link href="#">Privacy Policy</Link>
                        <Link href="#">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
