import React, { useState, useEffect } from "react";

interface NavbarProps {
  anchors: { name: string; label: string; text: string }[];
  currentSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ anchors, currentSection }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  //Handles the expansion and collapsing of the navbar
  const handleNavbarToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  //Collapse the Expanded Navbar
  const handleClickOutside = (e: MouseEvent) => {
    const sidebar = document.querySelector(".navbar-container");
    if (sidebar && !(sidebar as HTMLElement).contains(e.target as Node)) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    // Listen for click events to close the navbar when clicking outside
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (name: string) => {
    window.location.hash = name;
    setIsExpanded(false);
  };

  return (
    <nav
      onClick={handleNavbarToggle}
      className={`navbar-container 
        ${isExpanded ? "expanded" : ""}
        `}
    >
      <ul className={`navbar ${!isExpanded ? "disabled" : ""}`}>

        {anchors.map((anchor, index) => (
          <li key={index} className="navbar-opt">
            <button
              aria-label={`Navigate to ${anchor.label}`}
              className={`navbar-opt ${anchor.name === currentSection ? "active" : ""
                }
                ${isExpanded ? "expanded-btn" : ""}`}
              onClick={() => {

                handleOptionClick(anchor.name);
              }}
            >
              <span className="button-text">
                {isExpanded ? anchor.label : anchor.text}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
