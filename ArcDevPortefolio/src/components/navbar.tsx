import React, { useState, useEffect } from "react";

interface NavbarProps {
  anchors: { name: string; label: string; text: string }[];
  currentSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ anchors, currentSection }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const isDesktopView = window.innerWidth >= 1024;

  //Handles the expansion and collapsing of the navbar
  const handleNavbarToggle = () => {
    if (!isDesktopView) {
      setIsExpanded((prev) => !prev);
    }
  };

  //Collapse the Expanded Navbar
  const handleClickOutside = (e: MouseEvent) => {
    const sidebar = document.querySelector(".navbar-container");
    if (sidebar && !(sidebar as HTMLElement).contains(e.target as Node)) {
      setIsExpanded(false);
    }
  };

  // Listen for click events to close the navbar when clicking outside
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //Allow navbar to expand upon mouse hover on desktop view
  const handleMouseEnter = () => {
    if (isDesktopView) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktopView) {
      setIsHovered(false);
    }
  };

  //Accept either hover or Active State by clicking the element
  const isNavbarExpanded = isHovered || isExpanded;

  //Navigation between pages upon page click
  const handleOptionClick = (name: string) => {
    window.location.hash = name;
    setIsExpanded(false);
  };

  return (
    <nav
      onClick={handleNavbarToggle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`navbar-container 
        ${isNavbarExpanded ? "expanded" : ""}
        ${window.location.hash !== "#intro" ? "top-navbar" : ""}
        `}
    >
      <ul
        className={`navbar 
        ${!isNavbarExpanded ? "disabled" : ""}
        ${window.location.hash !== "#intro" ? "top-navbar" : ""}
      `}
      >
        {anchors.map((anchor, index) => (
          <li key={index} className="navbar-opt">
            <button
              aria-label={`Navigate to ${anchor.label}`}
              className={`navbar-opt ${
                anchor.name === currentSection ? "active" : ""
              }
                ${isNavbarExpanded ? "expanded-btn" : ""}`}
              onClick={() => {
                handleOptionClick(anchor.name);
              }}
            >
              {isNavbarExpanded ? anchor.label : anchor.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
