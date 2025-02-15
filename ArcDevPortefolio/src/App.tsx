// @ts-nocheck
//TS no check was added after the app was fully built. Errors with the props of the fullpage api stopped the production code,
// but did not affect the performance of the app

import React, { useState, useEffect } from "react";
import ReactFullpage from "@fullpage/react-fullpage";

import navigationAnchors from "./mappedInfo/navigationAnchors";
import disableZoomScroll from "./hooks/disableZoomScroll";
import handlePageLoad from "./hooks/handlePageLoad";
import useIsDesktop from "./hooks/currentViewport";

import Loading from "./pages/loading";
import Intro from "./pages/intro";
import Skills from "./pages/skills";
import Projects from "./pages/projects";
import Contacts from "./pages/contacts";
import Navbar from "./components/navbar";
import DownArrow from "./components/downArrow";

const FullPageWrapper: React.FC = () => {
  //Track current section being seen by the user
  const [currentSection, setCurrentSection] = useState<string>(
    window.location.hash ? window.location.hash.slice(1) : "intro"
  );

  //UseEffect to handle the loading and the automatic navigation upon page refresh
  useEffect(() => {
    // If the hash is empty or root, navigate to #intro by default
    if (!window.location.hash || window.location.hash === "#") {
      window.location.hash = "#intro";
      setCurrentSection("intro");
    }

    //If the user was not in the intro Page, maintain the page that the user is viewing upon page refresh
    const handleHashChange = () => {
      // Update the state when the hash changes
      setCurrentSection(window.location.hash.slice(1));
    };

    return () => {
      // Cleanup listener on unmount
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  //Track if the user is on a desktop or higher viewport
  const isDesktop = useIsDesktop();

  // Track loading state
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    disableZoomScroll(); //Disable zoom on desktop
    handlePageLoad(setIsLoading); //Handle the loading of the page
  }, [isDesktop]);

  return (
    <>
      <div className={`loading-screen ${isLoading ? "" : "hidden"}`}>
        <Loading />
      </div>

      <div className={`app-content ${!isLoading ? "visible" : ""}`}>
        <Navbar anchors={navigationAnchors} currentSection={currentSection} />

        <ReactFullpage
          scrollingSpeed={750}
          anchors={navigationAnchors.map((anchor) => anchor.name)}
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
                    <DownArrow nextSectionId="#skills" />
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
