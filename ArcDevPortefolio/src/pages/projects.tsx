import { useState } from "react"
import { oldProjects } from '../mappedInfo/pastProjects'
import { TechnologiesMap } from "../mappedInfo/technologiesMap";

//Swiper Components and stylings 
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';
import { Navigation, EffectFade, EffectCoverflow } from 'swiper/modules';


const Projects: React.FC = () => {

  //Manage if the details of the project are visible or not 
  const [showDetails, setShowDetails] = useState<boolean>(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <section className="section-container"
      onClick={() => {
        //Untoggle Details when clicked outside of the frame
        showDetails && toggleDetails()
      }}>
      <h2 className="page-title">
        Projects
      </h2>
      <div className="frame">
        <div className="frame-container">
          <Swiper
            loop={true}
            navigation={true}
            effect={"fade"}
            speed={300}
            modules={[Navigation, EffectFade, EffectCoverflow]}
            breakpoints={{
              // Mobile: Only show one slide with fade effect
              0: {
                slidesPerView: 1,
              },
              // Desktop: Show main slide with previews on the sides
              768: {
                slidesPerView: 1.5, // Main slide + partial previews
                spaceBetween: 20,
                effect: 'coverflow',
                coverflowEffect: {
                  rotate: 0,
                  stretch: 100,
                  depth: 200,
                  modifier: 1,
                  slideShadows: false,
                },
              },
            }}
            className="mySwiper"
          >
            {oldProjects.map((project, index) => (
              <SwiperSlide key={index}>
                <img className="project-image"
                  src={project.thumbnailLarge}
                  srcSet={`${project.thumbnailSmall} 480w, ${project.thumbnailLarge} 1024w`}
                  sizes="(max-width: 768px) 480px, 1024px"
                  alt={`${project.title} thumbnail`}
                  onClick={toggleDetails}
                />
                <div
                  className={`project-details-container ${showDetails ? 'visible' : ''
                    }`}
                >
                  <h3 className="project-title">{project.title}</h3>
                  <div className="details">
                    <div className="project-tech">
                      {project.techStack.map((techName) => {
                        const tech = TechnologiesMap.find((item) => item.name === techName)
                        return (tech && (
                          <img
                            key={tech.name}
                            src={tech.icon}
                            alt={tech.name}
                            className="tech-icon"
                          />
                        ))
                      })}
                    </div>
                    <div className="project-links-container">
                      <a href={project.src}
                        className="project-link"
                        aria-label="Visit Website"
                        target="_blank">
                        View website
                      </a>
                      <a href={project.github}
                        className="project-link"
                        aria-label="See Code"
                        target="_blank">
                        View code
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section >
  )
}

export default Projects
