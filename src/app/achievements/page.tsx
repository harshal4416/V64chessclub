"use client";

import './achievements.css';

const achieveImages = [
    { src: "/1.1.jpeg", title: "🏆 1st Place", desc: "Under-19 District Level Chess Tournament." },
    { src: "/1.7.jpeg", title: "⚡ 1st Place", desc: "Under-17 fide rated Blitz Chess Tournament." },
    { src: "/1.8.jpeg", title: "♟️ 1st Place", desc: " Interschool  Rapid Chess Tournament." },
    { src: "/1.4.jpeg", title: "Winning", desc: "🥇 50+ Medals Won by Our Academy Players in Various Competitions." }
];

export default function AchievementsPage() {
    return (
        <div className="achievements-page container animate-fade-in">
            <div className="section-title text-center">
                <h1>OUR ACHIEVEMENTS</h1>
                <p>Celebrating the milestones and success stories of V64chessclub</p>
            </div>

            <div className="achievements-gallery">
                {achieveImages.map((img, index) => (
                    <div key={index} className="achievement-item glass-effect">
                        <div className="achievement-img-wrapper">
                            <img src={img.src} alt={img.title} className="achievement-img" />
                        </div>
                        <div className="achievement-info">
                            <h3>{img.title}</h3>
                            <p>{img.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="achievements-extra section glass-effect">
                <div className="stats-grid">
                    <div className="counter-item">
                        <span className="counter-num">500+</span>
                        <p>Students Trained</p>
                    </div>
                    <div className="counter-item">
                        <span className="counter-num">150+</span>
                        <p>Tournament Medals</p>
                    </div>
                    <div className="counter-item">
                        <span className="counter-num">10+</span>
                        <p>FIDE Rated Coaches</p>
                    </div>
                    <div className="counter-item">
                        <span className="counter-num">98%</span>
                        <p>Success Rate</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
