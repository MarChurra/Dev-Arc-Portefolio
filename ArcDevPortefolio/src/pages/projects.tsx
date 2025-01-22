import { useState, useCallback, useEffect } from "react";
import { pastProjects } from "../mappedInfo/pastProjects";
import CustomSwiper from "../components/CustomSwiper";
import CustomNavigation from "../components/customNavigation";
import { Swiper as SwiperCore } from "swiper";

interface ProjectProps {
  nextSectionId?: string;
}

const Projects: React.FC<ProjectProps> = () => {
  //States to keep track of the current project being seen
  const [activeProjectId, setActiveProjectId] = useState<string>(
    pastProjects[0].id
  );
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);

  // Handle slide change to update the active index
  const handleSlideChange = (swiper: SwiperCore) => {
    const realIndex = swiper.realIndex;
    setActiveProjectId(pastProjects[realIndex].id);
  };

  // Navigate to selected slide
  const goToSlide = (id: string) => {
    const index = pastProjects.findIndex((project) => project.id === id);
    if (swiperInstance) {
      swiperInstance.slideToLoop(index);
    }
  };

  //Manage if the details of the project are visible or not
  const [showDetails, setShowDetails] = useState<boolean>(true);
  const [isBlocked, setIsBlocked] = useState<boolean>(true);

  const toggleDetails = useCallback(() => {
    if (!isBlocked) {
      //Prevent Toggling the details on
      setShowDetails((prev) => !prev);
    }
  }, [isBlocked, showDetails]);

  useEffect(() => {
    if (window.location.hash === "#projects") {
      setShowDetails(true);
      setIsBlocked(true);

      const timer = setTimeout(() => {
        setShowDetails(false);
        setIsBlocked(false);
      }, 1250);

      return () => clearTimeout(timer);
    }
  }, [window.location.hash]);

  return (
    <>
      <section className="section-container projects-container">
        <div className="project-slider">
          <h2 className="page-title">Projects</h2>
          <CustomSwiper
            toggleDetails={toggleDetails}
            showDetails={showDetails}
            handleSlideChange={handleSlideChange}
            setSwiperInstance={setSwiperInstance}
            setShowDetails={setShowDetails}
            activeProjectId={activeProjectId}
            pastProjects={pastProjects}
          />
          <CustomNavigation
            swiperInstance={swiperInstance}
            activeProjectId={activeProjectId}
            goToSlide={goToSlide}
            showDetails={showDetails}
            toggleDetails={toggleDetails}
          />
        </div>
      </section>
    </>
  );
};

export default Projects;
