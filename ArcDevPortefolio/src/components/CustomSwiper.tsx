import { oldProjects } from "../mappedInfo/pastProjects";
import { TechnologiesMap } from "../mappedInfo/technologiesMap";

//Swiper Components and stylings
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import { Navigation, EffectFade, EffectCoverflow } from "swiper/modules";

//Swiper Configurations
const swiperBreakpoints = {
  0: {
    slidesPerView: 1,
  },
  768: {
    slidesPerView: 1.5,
    spaceBetween: 20,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 0,
      stretch: 100,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    },
  },
};

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
  return (
    <>
      <div className="frame">
        <div className="frame-container">
          <Swiper
            loop={true}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={250}
            modules={swiperModules}
            onSlideChange={handleSlideChange}
            breakpoints={swiperBreakpoints}
            className="mySwiper"
            onSwiper={setSwiperInstance}
          >
            {oldProjects.map((project, index) => (
              <SwiperSlide key={index}>
                <img
                  className="project-image"
                  src={project.thumbnailLg}
                  srcSet={`${project.thumbnailSML} 350w, ${project.thumbnailLg} 1000w`}
                  sizes="(max-width: 350px) 100vw, (max-width: 1000px) 100vw, 1024px"
                  alt={`${project.title} thumbnail`}
                  onClick={toggleDetails}
                />
                <div
                  className={`project-details-container ${
                    showDetails ? "visible" : ""
                  }`}
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
                      >
                        View website
                      </a>
                      <a
                        href={project.github}
                        className="project-link"
                        aria-label="See Code"
                        target="_blank"
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
