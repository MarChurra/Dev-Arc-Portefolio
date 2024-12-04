import { useState, useCallback } from "react";
import CustomSwiper from "../components/CustomSwiper";
import CustomNavigation from "../components/customNavigation";
import { Swiper as SwiperCore } from "swiper";

const Projects: React.FC = () => {
  //States to keep track of the current project being seen
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);

  // Handle slide change to update the active index
  const handleSlideChange = (swiper: SwiperCore) => {
    const realIndex = swiper.realIndex;
    setActiveIndex(realIndex);
  };

  // Navigate to selected slide
  const goToSlide = (index: number) => {
    swiperInstance && swiperInstance.slideTo(index);
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
        activeIndex={activeIndex}
        goToSlide={goToSlide}
      />
    </section>
  );
};

export default Projects;
