import { useState, useRef, useEffect } from "react";
import { oldProjects } from "../mappedInfo/pastProjects";
import { TechnologiesMap } from "../mappedInfo/technologiesMap";

//Swiper Components and stylings
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import { Navigation, EffectFade, EffectCoverflow } from "swiper/modules";

interface CustomSwiperProps {
  toggleDetails: () => void;
  showDetails: boolean;
}

const CustomSwiper: React.FC<CustomSwiperProps> = ({
  toggleDetails,
  showDetails,
}) => {
  {
    /* Logic to handle the custom navigation between slides */
  }
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Handle slide change to update the active index
  const handleSlideChange = () => {
    if (swiperRef.current) {
      setActiveIndex(swiperRef.current.swiper.realIndex);
    }
  };

  //Navigate to selected slide
  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  {
    /* Logic that hides navigation buttons that cannot be fully rendered*/
  }
  const selectionButtons = document.querySelectorAll(".selection-button");
  const selectionContainer = document.querySelector(".selection-container");

  const checkVisibility = (button: HTMLElement) => {
    const containerRect = selectionContainer?.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    //Verify if the button is fully within the visible area of the container

    return (
      buttonRect.left >= containerRect.left &&
      buttonRect.right <= containerRect.right
    );
  };

  const updateSelectorVisbility = () => {
    selectionButtons.forEach((button: HTMLElement) => {
      if (checkVisibility(button)) {
        button.style.display = "inline-block"; //render the button
      } else {
        button.style.display = "none"; // Hide the button
      }
    });
  };

  useEffect(() => {
    updateSelectorVisbility();
    window.addEventListener("resize", updateSelectorVisbility);

    return () => {
      window.removeEventListener("resize", updateSelectorVisbility);
    };
  }, []);

  //Allows keyboard navigation between the selectors
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        swiperRef.current?.swiper.slidePrev();
      } else if (event.key === "ArrowRight") {
        swiperRef.current?.swiper.slideNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="frame">
        <div className="frame-container">
          <Swiper
            loop={true} 
            effect={"fade"}
            speed={300}
            modules={[Navigation, EffectFade, EffectCoverflow]}
            onSlideChange={handleSlideChange}
            breakpoints={{
              // Mobile: Only show one slide with fade effect
              0: {
                slidesPerView: 1,
              },
              // Desktop: Show main slide with previews on the sides
              768: {
                slidesPerView: 1.5, // Main slide + partial previews
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
            }}
            className="mySwiper"
            ref={swiperRef} 
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

      {/* Custom Navigation */}

      <div className="projects-navigation">
        <button
          className="custom-arrow"
          onClick={() => swiperRef.current?.swiper.slidePrev()}
        >
          <img
            className="custom-arrow-img"
            src="/assets/icons/arrow_left.png"
            alt="Navigate to the previous project"
          />
        </button>

        {/* Selection Container */}
        <div className="selection-container">
          {oldProjects.map((project, index) => (
            <>
              <button
                key={index}
                className={`selection-button
                    ${activeIndex === index ? "active" : ""}`}
                onClick={() => goToSlide(index)}
              >
                <img
                  src={`${
                    activeIndex === index
                      ? "/assets/icons/select_btn_highlight.png"
                      : "/assets/icons/select_btn.png"
                  }`}
                  alt={`Navigate to project ${index + 1}`}
                  className={`${
                    activeIndex === index
                      ? "selection-img-highlight"
                      : "selection-img"
                  }`}
                />
              </button>
              {index < oldProjects.length - 1 && ( // Add the circle only between selectors
                <img
                  src="/assets/icons/selector_circle.png"
                  alt="Decorative image separating project selectors"
                  className="selector-separator"
                />
              )}
            </>
          ))}
        </div>

        <button
          className="custom-arrow"
          onClick={() => swiperRef.current?.swiper.slideNext()}
        >
          <img
            className="custom-arrow-img"
            src="/assets/icons/arrow_right.png"
            alt="Navigate to the next project"
          />
        </button>
      </div>
    </>
  );
};

export default CustomSwiper;
