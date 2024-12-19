const SocialNav: React.FC = () => {
  return (
    <ul className="social-navbar">
      <li className="social-option">
        <a
          className="social-link"
          href="https://www.linkedin.com/in/marcochurra/"
          target="_blank"
        >
          <img
            className="social-icon"
            src="/assets/icons/linkedIn_icon.png"
            alt="Icon and link to LinkedIn  page"
          />
        </a>
      </li>
      <li className="social-option">
        <a
          className="social-link"
          href="https://github.com/MarChurra"
          target="_blank"
        >
          <img
            className="social-icon"
            src="/assets/icons/github_icon.png"
            alt="Icon and link to Github page"
          />
        </a>
      </li>
      <li className="social-option">
        <a
          className="social-link"
          href="https://api.whatsapp.com/send/?phone=351969728516&text&type=phone_number&app_absent=0"
          target="_blank"
        >
          <img
            className="social-icon"
            src="/assets/icons/whatsapp_icon.png"
            alt="Icon and link to whatsapp"
          />
        </a>
      </li>
      <li className="social-option">
        <a
          className="social-link"
          href="mailto:mchurra.dev@outlook.pt"
        >
          <img
            className="social-icon"
            src="/assets/icons/mail_icon.png"
            alt="Icon and link to Email"
          />
        </a>
      </li>
    </ul>
  );
};

export default SocialNav;
