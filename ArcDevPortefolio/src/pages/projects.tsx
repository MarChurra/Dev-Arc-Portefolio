import { useState, useCallback } from "react";
import { oldProjects } from "../mappedInfo/pastProjects";
import CustomSwiper from "../components/CustomSwiper";
import CustomNavigation from "../components/customNavigation";
import { Swiper as SwiperCore } from "swiper";

const Projects: React.FC = () => {
  //States to keep track of the current project being seen
  const [activeProjectId, setActiveProjectId] = useState<string>(
    oldProjects[0].id
  );
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);

  // Handle slide change to update the active index
  const handleSlideChange = (swiper: SwiperCore) => {
    const realIndex = swiper.realIndex;
    setActiveProjectId(oldProjects[realIndex].id);
  };

  // Navigate to selected slide
  const goToSlide = (id: string) => {
    const index = oldProjects.findIndex((project) => project.id === id);
    if (swiperInstance) {
      swiperInstance.slideToLoop(index);
    }
  };

  //Manage if the details of the project are visible or not
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const toggleDetails = useCallback(() => {
    setShowDetails((prev) => !prev);
  }, []);

  return (
    <section
      className="section-container"
      onClick={() => {
        showDetails && toggleDetails();
      }}
    >
      <h2 className="page-title">Projects</h2>
      <CustomSwiper
        toggleDetails={toggleDetails}
        showDetails={showDetails}
        handleSlideChange={handleSlideChange}
        setSwiperInstance={setSwiperInstance}
      />
      <CustomNavigation
        swiperInstance={swiperInstance}
        activeProjectId={activeProjectId}
        goToSlide={goToSlide}
      />
    </section>
  );
};

export default Projects;
