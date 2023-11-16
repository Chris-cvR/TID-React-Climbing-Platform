import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"

function AboutPage() {

    return (
        <div>
            <Navbar />
            <div className='page-container'>
                <h1>About PeakPulse</h1>
                <p>Welcome to PeakPulse, the ultimate social media platform designed exclusively for climbers! Founded in 2023, our mission is to bring the climbing community closer together, making it easier than ever to share and discover new climbing spots around the world.</p>

                <h2>Our Vision</h2>
                <p>At PeakPulse, we believe in the power of community-driven knowledge. We understand that climbers crave accurate, up-to-date information about their favorite climbing locations. That's why we've created a platform that allows you to connect with fellow climbers, share your experiences, and access invaluable insights about climbing spots near and far.</p>

                <h2>Features That Define Us</h2>
                <ul>
                    <li><b>Location Sharing:</b> Share your favorite climbing locations with ease. Whether it's a hidden gem or a well-known hotspot, PeakPulse lets you pinpoint exactly where the action happens.</li>
                    <li><b>Community-Driven Reviews:</b> Leave comments, tips, and recommendations for other climbers. Share your expertise or seek advice from the seasoned pros in our community.</li>
                    <li><b>Discover New Heights:</b> Unearth hidden treasures and uncover fresh challenges. With PeakPulse, you'll always have a new adventure waiting just around the corner.</li>
                </ul>

                <h2>Join Our Community</h2>
                <p>The heart of PeakPulse lies in its vibrant community of climbers. Connect with like-minded individuals, forge new friendships, and embark on climbing adventures together. We're here to support you in your pursuit of reaching new heights.</p>

                <h2>Get Started Today</h2>
                <p>Ready to take your climbing experience to the next level? Join us on PeakPulse and be a part of a revolution in climbing information sharing. Sign up now and let's embark on this journey together!</p>
            </div>
            <Footer />
        </div>

    );
}

export default AboutPage;