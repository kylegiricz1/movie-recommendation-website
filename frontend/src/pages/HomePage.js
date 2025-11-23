import Navbar from '../components/Navbar';
import LightRays from '../components/LightRays';
import './HomePage.css';

function HomePage() {
  return (
    <div className="page">
      <Navbar />

      {/* HERO with background rays */}
      <section className="hero">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="hero-rays"
        />

        <div className="hero-content">
          <h1 className="title">Home Page</h1>

          <section className="home-section">
            <h2>Welcome!</h2>
            <p>
              Movie Recommender helps you discover new films tailored to your taste. Whether you’re into
              thrillers, comedies, or hidden indie gems, our system suggests movies based on your viewing
              history and preferences.
            </p>
            <p>
              Click on the <b>List of Movies</b> or <b>Wizard</b> tabs to get started!
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
