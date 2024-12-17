import { oldProjects } from "../mappedInfo/pastProjects";
import { TechnologiesMap } from "../mappedInfo/technologiesMap";
import useIsDesktop from "../hooks/currentViewport";

//Swiper Components and stylings
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import { Navigation, EffectFade, EffectCoverflow } from "swiper/modules";

const swiperModules = [Navigation, EffectFade, EffectCoverflow];

interface CustomSwiperProps {
  toggleDetails: () => void;
  showDetails: boolean;
  handleSlideChange: (swiper: SwiperCore) => void;
  setSwiperInstance: (swiper: SwiperCore) => void;
}

const CustomSwiper: React.FC<CustomSwiperProps> = ({
  toggleDetails,
  showDetails,
  handleSlideChange,
  setSwiperInstance,
}) => {
  //Toggles the show Details when user hovers the container in a desktop or higher viewport
  const isDesktop = useIsDesktop();

  return (
    <>
      <div
        className="frame"
        onMouseEnter={isDesktop ? toggleDetails : undefined}
        onMouseLeave={isDesktop ? toggleDetails : undefined}
      >
        <div className="frame-container">
          <Swiper
            loop={true}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={250}
            modules={swiperModules}
            onSlideChange={handleSlideChange}
            className="mySwiper"
            onSwiper={setSwiperInstance}
          >
            {oldProjects.map((project) => (
              <SwiperSlide key={project.id}>
                <img
                  className="project-image"
                  src={project.thumbnailLg}
                  srcSet={`${project.thumbnailSML} 500w, ${project.thumbnailLg} 1000w`}
                  sizes="(max-width: 350px) 100vw, (max-width: 1000px) 100vw, 1024px"
                  alt={`${project.title} thumbnail`}
                  onClick={!isDesktop ? toggleDetails : undefined}
                />
                <div
                  className={`project-details-container ${
                    showDetails ? "visible" : ""
                  }`}
                  onClick={(event) => {
                    event.stopPropagation();
                    if (!isDesktop) toggleDetails();
                  }}
                >
                  <h3 className="project-title">{project.title}</h3>
                  <div className="details">
                    <div className="project-tech">
                      {project.techStack.map((techName) => {
                        const tech = TechnologiesMap.find(
                          (item) => item.name === techName
                        );
                        return (
                          tech && (
                            <img
                              key={tech.name}
                              src={tech.icon}
                              alt={tech.name}
                              className="tech-icon"
                            />
                          )
                        );
                      })}
                    </div>
                    <div className="project-links-container">
                      <a
                        href={project.src}
                        className="project-link"
                        aria-label="Visit Website"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View website
                      </a>
                      <a
                        href={project.github}
                        className="project-link"
                        aria-label="See Code"
                        target="_blank"
                        rel="noreferrer"
                      >
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
    </>
  );
};

export default CustomSwiper;
