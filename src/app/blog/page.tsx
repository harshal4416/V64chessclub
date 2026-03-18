import Link from 'next/link';
import './blog.css';

export default function Blog() {
    const posts = [
        {
            id: 1,
            title: 'Mastering the Sicilian Defense: A Deep Dive into the Najdorf Variation',
            excerpt: 'Explore the complexities of one of the sharpest openings in chess. We analyze key tactical motifs and strategic ideas for both colors.',
            date: 'Feb 15, 2026',
            author: 'GM Hikaru N.',
            category: 'Openings',
            readTime: '8 min read',
            image: '/2.1.jpeg'
        },
        {
            id: 2,
            title: 'The Psychology of the Endgame: Maintaining Focus Under Time Pressure',
            excerpt: 'Struggling in the final phase of the game? Learn how to calculate accurately and keep a cool head when the clock is ticking down.',
            date: 'Feb 02, 2026',
            author: 'GM Magnus C.',
            category: 'Psychology',
            readTime: '6 min read',
            image: '/2.2.jpeg'
        },
        {
            id: 3,
            title: '5 Common Middlegame Mistakes Club Players Make (And How to Fix Them)',
            excerpt: 'We analyze hundreds of games from the 1500-1800 rating bracket to identify the most frequent strategic errors and provide actionable solutions.',
            date: 'Jan 28, 2026',
            author: 'IM Levy R.',
            category: 'Strategy',
            readTime: '10 min read',
            image: '/2.3.jpeg'
        },
        {
            id: 4,
            title: 'Academy News: Upcoming FIDE Rated Classical Tournament in March',
            excerpt: 'Registration is now open for our flagship Spring classical event. Prize pool details, schedule, and safety protocols inside.',
            date: 'Jan 15, 2026',
            author: 'Admin Team',
            category: 'News',
            readTime: '3 min read',
            image: '/blog-1.jpeg'
        },
        {
            id: 5,
            title: 'Understanding Pawn Structures: The Carlsbad Formation',
            excerpt: 'A comprehensive guide to playing with and against the famous Carlsbad pawn structure, commonly arising from the Queen\'s Gambit Declined.',
            date: 'Jan 05, 2026',
            author: 'GM Fabiano C.',
            category: 'Strategy',
            readTime: '12 min read',
            image: '/blog-5.jpeg'
        },
        {
            id: 6,
            title: 'Tactics Tuesday: 10 Instructive Puzzles to Sharpen Your Calculation',
            excerpt: 'Test your tactical vision with these carefully selected positions from recent master-level games. Can you find the winning continuations?',
            date: 'Dec 30, 2025',
            author: 'Coach Sarah T.',
            category: 'Tactics',
            readTime: '15 min read',
            image: '/blog-2.jpeg'
        }
    ];

    return (
        <div className="blog-page">
            <section className="page-header section chess-pattern">
                <div className="container center animate-fade-in">
                    <div className="badge">Latest Articles</div>
                    <h1 className="page-title">V64chessclub <span className="highlight">Blog</span></h1>
                    <p className="page-subtitle">Expert insights, opening analysis, and academy news straight from our titled coaches and staff.</p>
                </div>
            </section>

            <section className="section blog-content">
                <div className="container">



                    <div className="blog-grid">
                        {posts.map(post => (
                            <article key={post.id} className="blog-card glass-panel" style={{ overflow: 'hidden' }}>
                                <img src={post.image} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                <div className="blog-card-content">
                                    <div className="blog-meta">
                                        <span className="blog-category">{post.category}</span>
                                        <span className="blog-read-time">{post.readTime}</span>
                                    </div>
                                    <h3 className="blog-card-title">
                                        <Link href="#">{post.title}</Link>
                                    </h3>
                                    <p className="blog-card-excerpt">{post.excerpt}</p>
                                    <div className="blog-card-footer">
                                        <div className="author-info">
                                            <div className="author-avatar"></div>
                                            <span className="author-name">{post.author}</span>
                                        </div>
                                        <span className="post-date">{post.date}</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="blog-pagination center mt-xl">
                    </div>

                </div>
            </section>
        </div>
    );
}
