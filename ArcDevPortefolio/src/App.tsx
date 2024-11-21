import React, { useState, useEffect } from 'react'
import ReactFullpage from '@fullpage/react-fullpage'

import Home from './pages/home'
import Skills from './pages/skills'
import Projects from './pages/projects'
import Contacts from './pages/contacts'


const FullPageWrapper: React.FC = () => {
  //Track current section being seen by the user 
  const [currentSection, setCurrentSection] = useState<string>(
    window.location.hash ? window.location.hash : 'home'
  )

  //If the user was not in the Home Page, maintain the page that the user is viewing upon page refresh
  useEffect(() => {
    if (currentSection) {
      window.location.hash = currentSection
    }
  }, [currentSection])


  return (
    <ReactFullpage
      scrollingSpeed={750}
      anchors={['home', 'skills', 'projects', 'contacts']}
      scrollBar={false} //Scrollbar is hidden with CSS. Without scrollbar property, the height of the last section inst being correctly calculated
      verticalCentered={false}
      fitToSection={true}
      fitToSectionDelay={750}
      onLeave={(origin, destination) => {
        // Update state when leaving a section
        setCurrentSection(destination.anchor || 'home');
      }}
      render={({ state, fullpageApi }): React.ReactElement => {
        return (
          <ReactFullpage.Wrapper>
            <div id='homeSection' className="section">
              <Home />
            </div>
            <div id='skillsSection' className="section">
              <Skills />
            </div>
            <div id='projectsSection' className="section">
              <Projects />
            </div>
            <div id='contactSection' className="section">
              <Contacts />
            </div>
          </ReactFullpage.Wrapper>
        )
      }}
    />
  )
}

export default FullPageWrapper
