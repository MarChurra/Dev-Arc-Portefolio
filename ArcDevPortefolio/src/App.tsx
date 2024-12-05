import React, { useState, useEffect } from "react";
import ReactFullpage from "@fullpage/react-fullpage";

import Loading from "./pages/loading";
import Intro from "./pages/intro";
import Skills from "./pages/skills";
import Projects from "./pages/projects";
import Contacts from "./pages/contacts";
import Navbar from "./components/navbar";

const FullPageWrapper: React.FC = () => {

  // Track loading state
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //Track current section being seen by the user
  const [currentSection, setCurrentSection] = useState<string>(
    window.location.hash ? window.location.hash.slice(1) : "intro"
  );

  //If the user was not in the intro Page, maintain the page that the user is viewing upon page refresh
  useEffect(() => {
    const handleHashChange = () => {
      // Update the state when the hash changes
      setCurrentSection(window.location.hash.slice(1));
    };

    window.addEventListener("hashchange", handleHashChange);

    // Add event listener for the load event
    const handlePageLoad = () => {
      setIsLoading(false); // Finish loading as soon as app content has fully loaded
    };

    // Attach the event listener for the window load event
    if (document.readyState === "complete") {
      // If the page is already loaded
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
    }

    return () => {
      // Cleanup listener on unmount
      window.removeEventListener("load", handlePageLoad);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const navigationAnchors = [
    { name: "intro", label: "Intro", text: "I" },
    { name: "skills", label: "Skills", text: "S" },
    { name: "projects", label: "Projects", text: "P" },
    { name: "contacts", label: "Contacts", text: "C" },
  ];

  const pageAnchors = navigationAnchors.map((anchor) => anchor.name);

  return (
    <>

      <div className={`loading-screen ${isLoading ? "" : "hidden"}`}>
        <Loading />
      </div>

      <div className={`app-content ${!isLoading ? "visible" : ""}`}>
        <Navbar anchors={navigationAnchors} currentSection={currentSection} />

        <ReactFullpage
          scrollingSpeed={850}
          anchors={pageAnchors}
          scrollBar={false} //Scrollbar is hidden with CSS. Without scrollbar property, the height of the sections inst being correctly calculated
          verticalCentered={false}
          fitToSection={true}
          fitToSectionDelay={750}
          onLeave={(origin, destination) => {
            // Update state when leaving a section
            setCurrentSection(destination.anchor || "intro");
          }}
          render={({ state, fullpageApi }): React.ReactElement => {
            return (
              <>
                <ReactFullpage.Wrapper>
                  <div id="introSection" className="section">
                    <Intro />
                  </div>
                  <div id="skillsSection" className="section">
                    <Skills />
                  </div>
                  <div id="projectsSection" className="section">
                    <Projects />
                  </div>
                  <div id="contactSection" className="section">
                    <Contacts />
                  </div>
                </ReactFullpage.Wrapper>
              </>
            );
          }}
        />
      </div>
    </>
  );
};

export default FullPageWrapper;
