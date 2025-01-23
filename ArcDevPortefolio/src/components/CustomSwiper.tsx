import { useEffect } from "react";
import { Project } from "../mappedInfo/pastProjects";
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

SwiperCore.use([EffectCoverflow, EffectFade]);

interface CustomSwiperProps {
  toggleDetails: () => void;
  showDetails: boolean;
  handleSlideChange: (swiper: SwiperCore) => void;
  setSwiperInstance: (swiper: SwiperCore) => void;
  setShowDetails: (value: boolean) => void;
  activeProjectId: string;
  pastProjects: Project[];
}

const CustomSwiper: React.FC<CustomSwiperProps> = ({
  toggleDetails,
  showDetails,
  handleSlideChange,
  setSwiperInstance,
  setShowDetails,
  activeProjectId,
  pastProjects,
}) => {
  //Toggles the show Details when user hovers the container in a desktop or higher viewport
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (isDesktop) {
      pastProjects.forEach((project) => {
        const img = new Image();
        img.src = project.thumbnailFrame;
      });
    }
  }, [isDesktop, pastProjects]);

  return (
    <>
      <div className="frame">
        <div className="frame-container">
          <Swiper
            slidesPerView={1}
            centeredSlides={true}
            spaceBetween={30}
            preventInteractionOnTransition={isDesktop ? true : false}
            breakpoints={{
              1200: {
                slidesPerView: 1.5,
                speed: 650,
                spaceBetween: 50,
              },
            }}
            loop={true}
            effect={isDesktop ? "coverflow" : "fade"}
            fadeEffect={!isDesktop ? { crossFade: true } : undefined}
            coverflowEffect={
              isDesktop
                ? {
                    rotate: 0,
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                    slideShadows: false,
                  }
                : undefined
            }
            speed={500}
            modules={[EffectCoverflow, Navigation]}
            onSlideChange={handleSlideChange}
            className="mySwiper"
            onSwiper={setSwiperInstance}
          >
            {pastProjects.map((project) => (
              <SwiperSlide
                key={project.id}
                onMouseEnter={
                  isDesktop && activeProjectId === project.id
                    ? toggleDetails
                    : undefined
                }
                onMouseOver={
                  isDesktop && activeProjectId === project.id
                    ? () => setShowDetails(true)
                    : undefined
                }
                onMouseLeave={
                  isDesktop && activeProjectId === project.id
                    ? () => setShowDetails(false)
                    : undefined
                }
              >
                <img
                  className="project-image"
                  src={
                    isDesktop && activeProjectId === project.id
                      ? project.thumbnailFrame
                      : project.thumbnail
                  }
                  alt={`${project.title} thumbnail`}
                  onClick={!isDesktop ? toggleDetails : undefined}
                />
                <div
                  className={`project-details-container ${
                    showDetails && activeProjectId === project.id
                      ? "visible"
                      : ""
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
