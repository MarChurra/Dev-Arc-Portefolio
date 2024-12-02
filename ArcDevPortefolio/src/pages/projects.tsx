import { useState, useRef, useCallback } from "react";
import CustomSwiper from "../components/CustomSwiper";
import CustomNavigation from "../components/customNavigation";
import { Swiper as SwiperCore } from 'swiper'


const Projects: React.FC = () => {
  //States to keep track of the current project being seen 
  const swiperRef = useRef<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Handle slide change to update the active index
  const handleSlideChange = (swiper:any) => {
    if (swiperRef.current !== swiper) {
      swiperRef.current = swiper;
      setActiveIndex(swiper.realIndex);
    }
  };

  //Navigate to selected slide
  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
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
        if (showDetails) {
          toggleDetails();
        }
      }}
    >
      <h2 className="page-title">Projects</h2>
      <CustomSwiper
        toggleDetails={toggleDetails}
        showDetails={showDetails}
        swiperRef={swiperRef}
        handleSlideChange={handleSlideChange}
      />
      <CustomNavigation
        swiperRef={swiperRef}
        activeIndex={activeIndex}
        goToSlide={goToSlide}
      />
    </section>
  );
};

export default Projects;
