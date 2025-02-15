import React, { useEffect, useCallback, useRef } from "react";
import { pastProjects } from "../mappedInfo/pastProjects";

interface CustomNavigationProps {
  swiperInstance: any | null;
  activeProjectId: string;
  goToSlide: (id: string) => void;
  toggleDetails: () => void;
  showDetails: boolean;
}

const CustomNavigation: React.FC<CustomNavigationProps> = ({
  swiperInstance,
  activeProjectId,
  goToSlide,
  toggleDetails,
  showDetails,
}) => {
  // Handle key down events for arrow navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!swiperInstance) return;

      if (event.key === "ArrowLeft") {
        swiperInstance.slidePrev();
      } else if (event.key === "ArrowRight") {
        swiperInstance.slideNext();
      }
    };
    //Add and cleanup the keydown event
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [swiperInstance]);

  //preload the active arrow icon
  useEffect(() => {
    const activeArrowLeft = new Image();
    const activeArrowRight = new Image();
    activeArrowRight.src = "/assets/icons/arrow_highlight_right.png";
    activeArrowLeft.src = "/assets/icons/arrow_highlight_left.png";
  }, []);

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
  }, [activeProjectId, scrollToActiveButton]);

  return (
    <div className="projects-navigation">
      <button
        className="custom-arrow arrow-left"
        onClick={() => {
          swiperInstance?.slidePrev();
          if (showDetails) {
            toggleDetails();
          }
        }}
        aria-label="Navigate to the previous project"
      >
        <img
          className="custom-arrow-img"
          src="/assets/icons/arrow_left.png"
          onMouseOver={(e) =>
            (e.currentTarget.src = "/assets/icons/arrow_highlight_left.png")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.src = "/assets/icons/arrow_left.png")
          }
          alt="Navigate to the previous project"
        />
      </button>

      <div className="selection-container" ref={selectionContainerRef}>
        {pastProjects.map((project, index) => (
          <React.Fragment key={project.id}>
            <button
              className={`selection-button ${
                activeProjectId === project.id ? "active" : ""
              }`}
              onClick={() => {
                goToSlide(project.id);
                if (showDetails) {
                  toggleDetails();
                }
              }}
              aria-label={`Navigate to the project number ${index + 1}`}
            >
              <img
                src={`${
                  activeProjectId === project.id
                    ? "/assets/icons/select_btn_highlight.png"
                    : "/assets/icons/select_btn.png"
                }`}
                className={`${
                  activeProjectId === project.id
                    ? "selection-img-highlight"
                    : "selection-img"
                }`}
                alt="Button to switch between projects"
              />
            </button>

            {index < pastProjects.length - 1 && (
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
          swiperInstance?.slideNext();
          if (showDetails) {
            toggleDetails();
          }
        }}
        aria-label="Navigate to the next project"
      >
        <img
          className="custom-arrow-img arrow-right"
          src="/assets/icons/arrow_right.png"
          onMouseOver={(e) =>
            (e.currentTarget.src = "/assets/icons/arrow_highlight_right.png")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.src = "/assets/icons/arrow_right.png")
          }
          alt="Navigate to the next project"
        />
      </button>
    </div>
  );
};

export default CustomNavigation;
