import { SwiperCore } from 'swiper';
import { oldProjects } from "../mappedInfo/pastProjects";

interface CustomNavigationProps {
    swiperRef: React.RefObject<SwiperCore | null>;
    activeIndex: number;
    goToSlide: (index: number) => void;
}

const CustomNavigation: React.FC<CustomNavigationProps> = ({
    swiperRef,
    activeIndex,
    goToSlide,
}) => {
    return (
        <div className="projects-navigation">
            <button
                className="custom-arrow"
                onClick={() => {swiperRef.current?.slidePrev()}}
            >
                <img
                    className="custom-arrow-img"
                    src="/assets/icons/arrow_left.png"
                    alt="Navigate to the previous project"
                />
            </button>
            <div className="selection-container">
                {oldProjects.map((project, index) => (
                    <>
                        <button
                            key={index}
                            className={`selection-button
                       ${activeIndex === index ? "active" : ""}`}
                            onClick={() => {
                                console.log(index)
                                goToSlide(index)
                            }} //Navigate to the selected project
                        >
                            <img
                                src={`${activeIndex === index
                                    ? "/assets/icons/select_btn_highlight.png"
                                    : "/assets/icons/select_btn.png"
                                    }`}
                                alt={`Navigate to project ${index + 1}`}
                                className={`${activeIndex === index
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
                onClick={() => swiperRef.current?.slideNext()}
            >
                <img
                    className="custom-arrow-img"
                    src="/assets/icons/arrow_right.png"
                    alt="Navigate to the next project"
                />
            </button>
        </div >
    )
}

export default CustomNavigation;
