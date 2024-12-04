import ContactForm from "../components/contactForm";
import SocialNav from "../components/social-nav";

const Contacts: React.FC = () => {
  return (
    <>
      <section className="section-container">
        <h2 className="page-title">Contacts</h2>
      </section>

      <p className="contact-info">
        I would be honored if you are interested in my work. <br />
        Feel free to contact me via the form below.
      </p>

      <ContactForm />

      <footer className="project-footer">
        <SocialNav />
        <img
          className="footer-logo"
          src="/assets/icons/logo.png"
          alt="Author´s Logo"
        />
      </footer>
    </>
  );
};

export default Contacts;
