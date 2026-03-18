"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import './Navbar.css';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Fees', path: '/fees' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Blog', path: '/blog' },
    { name: 'Admission', path: '/admission' },
    { name: 'Contact Us', path: '/contact' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container container">
                <Link href="/" className="logo-container">
                    <img src="/logo.jpeg" alt="V64chessclub Logo" className="logo-img" />
                    <span className="logo-text">V64chessclub</span>
                </Link>

                <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            className={`nav-link ${pathname === link.path ? 'active' : ''}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link href="/free-trial" className="btn btn-primary nav-cta" onClick={() => setMenuOpen(false)}>
                        1 Day Free Demo
                    </Link>
                </nav>

                <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                    <div className={`hamburger ${menuOpen ? 'open' : ''}`}></div>
                </button>
            </div>
        </header>
    );
}
