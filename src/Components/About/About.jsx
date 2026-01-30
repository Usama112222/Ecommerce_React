
import './About.css';
import AboutImage from '../Assets/about.jpg'

const About = () => {
  return (
    <div className="about-page">
      <h1 className="about-title">About Us</h1>

      <section className="about-section">
        <img src={AboutImage} alt="About Us" className="about-image" />
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            Welcome to our fashion store! We are passionate about bringing 
            the latest trends and timeless classics to our customers. 
            Our mission is to make fashion accessible, fun, and sustainable.
          </p>
          <p>
            From men’s and women’s apparel to kids’ wear, we carefully 
            curate every item to ensure quality, style, and comfort. 
            Explore our collections and find pieces that fit your personality and lifestyle.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
