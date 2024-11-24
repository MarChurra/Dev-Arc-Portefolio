import SocialNav from "../components/social-nav";

const Intro: React.FC = () => {
  return (
    <>
      <img
        className="app-logo"
        src="/assets/icons/logo.png"
        alt="Author´s Logo"
      />

      <div id="personal-container">
        <SocialNav />
        <img
          id="author-photo"
          src="/assets/images/profilePic-removebg-Photoroom.png"
          alt="Author´s Photograph"
        />
      </div>
      <div className="intro-info">
        <h1>Greetings!</h1>
        <p>
          My name is <span className="highlighted-text"> Marco Churra </span>
          <br />
          Welcome to my portefolio.
        </p>
        <p className="intro-paragraph">
          Currently based in Portugal, I am a
          <span className="highlighted-text"> Front End Developer </span> {""}
          who strives to build elegant and acessible applications.
        </p>
        <button className="contact-btn" type="button">
          <span className="btn-text">Contact Me</span>
        </button>
      </div>
      <a id="downArrowHook" href="#skills">
        <img
          id="downArrow"
          src="/assets/icons/arrow_down.png"
          alt="Clickable arrow to go down a page"
        />
      </a>
    </>
  );
};

export default Intro;
