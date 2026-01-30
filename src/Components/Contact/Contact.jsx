
import './Contact.css';
import Logo from '../Assets/logo_big.png'; // Replace with your actual logo

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Logo */}
      <div className="contact-logo">
        <img src={Logo} alt="Logo" />
      </div>

      {/* Heading */}
      <h1 className="contact-title">Get in Touch</h1>

      {/* Contact Info */}
      <div className="contact-info">
        <div className="info-card">
          <h3>Address</h3>
          <p>123 Fashion Street, New York, NY 10001</p>
        </div>
        <div className="info-card">
          <h3>Email</h3>
          <p>support@fashionstore.com</p>
        </div>
        <div className="info-card">
          <h3>Phone</h3>
          <p>+1 234 567 890</p>
        </div>
      </div>

      {/* Contact Form */}
      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows="5" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
