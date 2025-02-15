import SocialNav from "../components/social-nav";
import useIsDesktop from "../hooks/currentViewport";

const Intro: React.FC = () => {
  const isDesktop = useIsDesktop();

  return (
    <>
      <img
        className="app-logo"
        src="/assets/icons/logo.png"
        alt="Author´s Logo"
      />

      <div className="personal-container">
        <SocialNav />
        <img
          className="author-photo"
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
          Currently based in Portugal, I am a {""}
          <span className="highlighted-text"> Front End Developer </span> {""}
          who strives to build elegant and acessible applications.
        </p>
        <button
          className="contact-btn"
          type="button"
          onClick={() => (window.location.hash = "contacts")}
        >
          <span className="btn-text">Contact Me</span>
        </button>
        <a target="_blank" href="https://www.zaask.pt/user/mchurradev">
          {isDesktop ? (
            <img
              className="zaask-widget"
              src="https://www.zaask.pt/widget?user=924026&widget=pro-findme"
              alt=""
            />
          ) : null}
        </a>
      </div>
    </>
  );
};

export default Intro;
