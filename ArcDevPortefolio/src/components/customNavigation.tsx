import React, { useEffect, useCallback, useRef } from "react";
import { oldProjects } from "../mappedInfo/pastProjects";

interface CustomNavigationProps {
  swiperInstance: any | null;
  activeIndex: number;
  goToSlide: (index: number) => void;
}

const CustomNavigation: React.FC<CustomNavigationProps> = ({
  swiperInstance,
  activeIndex,
  goToSlide,
}) => {
  // Handle key down events for arrow navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!swiperInstance) return;

      if (event.key === "ArrowLeft") {
        // Navigate to the previous slide
        swiperInstance.slidePrev();
      } else if (event.key === "ArrowRight") {
        // Navigate to the next slide
        swiperInstance.slideNext();
      }
    };

    // Add event listener for arrow keys
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [swiperInstance]);

  //Add movement to the container of the buttons, that centers the active button, if any of them can´t be rendered
  const selectionContainerRef = useRef<HTMLDivElement>(null);

  const scrollToActiveButton = useCallback(() => {
    if (selectionContainerRef.current) {
      const container = selectionContainerRef.current;
      const activeButton = container.querySelector(".selection-button.active");
      if (activeButton) {
        const containerWidth = container.offsetWidth;
        const buttonLeft = (activeButton as HTMLElement).offsetLeft;
        const buttonWidth = (activeButton as HTMLElement).offsetWidth;
        const scrollLeft = buttonLeft - containerWidth / 2 + buttonWidth / 2;

        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, []);

  useEffect(() => {
    scrollToActiveButton();
  }, [activeIndex, scrollToActiveButton]);

  return (
    <div className="projects-navigation">
      <button
        className="custom-arrow"
        onClick={() => {
          if (swiperInstance) {
            swiperInstance.slidePrev();
          }
        }}
        aria-label="Navigate to the previous project"
      >
        <img
          className="custom-arrow-img"
          src="/assets/icons/arrow_left.png"
          alt="Navigate to the previous project"
        />
      </button>
      <div className="selection-container" ref={selectionContainerRef}>
        {oldProjects.map((project, index) => (
          <React.Fragment key={index}>
            <button
              className={`selection-button ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => {
                goToSlide(index);
              }}
              aria-label={`Navigate to the project number ${index}`}
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
          </React.Fragment>
        ))}
      </div>

      <button
        className="custom-arrow"
        onClick={() => {
          if (swiperInstance) {
            swiperInstance.slideNext();
          }
        }}
        aria-label="Navigate to the next project"
      >
        <img
          className="custom-arrow-img"
          src="/assets/icons/arrow_right.png"
          alt="Navigate to the next project"
        />
      </button>
    </div>
  );
};

export default CustomNavigation;
