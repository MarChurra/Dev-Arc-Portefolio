import { useEffect } from "react";
import { oldProjects } from "../mappedInfo/pastProjects";
import { TechnologiesMap } from "../mappedInfo/technologiesMap";

//Swiper Components and stylings
import { Swiper, SwiperSlide } from "swiper/react";
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
  swiperRef: React.RefObject<any>;
  handleSlideChange: () => void;
}

const CustomSwiper: React.FC<CustomSwiperProps> = ({
  toggleDetails,
  showDetails,
  swiperRef,
  handleSlideChange,
}) => {

  //Allows keyboard navigation between the selectors
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        swiperRef.current?.swiper?.slidePrev();
      } else if (event.key === "ArrowRight") {
        swiperRef.current?.swiper?.slideNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [swiperRef]);

  return (
    <>
      <div className="frame">
        <div className="frame-container">
          <Swiper
            loop={true}
            effect="fade"
            speed={300}
            modules={swiperModules}
            onSlideChange={handleSlideChange}
            breakpoints={swiperBreakpoints}
            className="mySwiper"
            ref={swiperRef}
            onSwiper={(swiperInstance) => {
              if (swiperRef.current !== swiperInstance) {
                swiperRef.current = swiperInstance;
              }
            }}
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
                  className={`project-details-container ${showDetails ? "visible" : ""
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
