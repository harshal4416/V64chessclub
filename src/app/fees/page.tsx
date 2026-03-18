export default function FeesPage() {
    return (
        <div className="fees-page container animate-fade-in">
            <div className="fees-header section-title">
                <h1>FEES STRUCTURE</h1>
                <p>Transparent and flexible plans tailored to our chess journey</p>
            </div>

            <div className="fees-image-container glass-effect">
                <img
                    src="/fees1.jpeg"
                    alt="V64chessclub Fees Structure"
                    className="fees-main-img"
                />
            </div>

            <div className="fees-note glass-effect">
                <h3>Custom Training Programs</h3>
                <p>We also offer personalized 1-on-1 coaching and specialized camp sessions. For detailed pricing and availability, please reach out to our team.</p>
                <div className="contact-info-small">
                    <span>📧 V64chessclub@gmail.com</span>
                    <span> CONTACT📞  +91 8010355685</span>
                </div>
            </div>
        </div>
    );
}
