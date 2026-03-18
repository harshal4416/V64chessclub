import { Star, Quote } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
    {
        name: "Mayur Badgujar",
        country: "Jalgaon",
        text: "The coaching here helped me improve my game a lot. with the guidance and regular practice, I achived a chess rating of 1599. The analysis sessions really improved my strategy",
        image: "/testimonials/mayur.jpeg"
    },
    {
        name: "Sanskar Badgujar",
        country: "Jalgaon",
        text: "Amazing training and support from the coaches. Because of the structured lession and practice games, I reached a 1585 rating and improved my tournment performance.",
        image: "/testimonials/sanskar.png"
    },
    {
        name: "Sanskruti Pawar",
        country: "Jalgaon",
        text: "The personalized coaching and opening prepration helped me perfom better in competitions. I'm proud to have been selected for the Inter-state tournment after tranning here.",
        image: "/testimonials/sanskruti.jpeg"
    }
];

export default function Testimonials() {
    return (
        <section className="testimonials-section">
            <div className="container">
                <h2 className="testimonials-title">What Our Students Say</h2>
                <div className="testimonials-grid">
                    {testimonials.map((t, i) => (
                        <div key={i} className="testimonial-card">
                            <div className="quote-bg">
                                <Quote size={80} />
                            </div>
                            <div className="stars">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} size={18} fill="#FFD700" color="#FFD700" />
                                ))}
                            </div>
                            <p className="testimonial-text">"{t.text}"</p>
                            <div className="student-info">
                                <div className="student-image-wrapper">
                                    <img src={t.image} alt={t.name} className="student-image" />
                                </div>
                                <h5 className="student-name">{t.name}</h5>
                                <span className="student-country">{t.country}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
