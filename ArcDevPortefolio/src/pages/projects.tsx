import { useState } from "react";
import CustomSwiper from "../components/CustomSwiper";

const Projects: React.FC = () => {
  //Manage if the details of the project are visible or not
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <section
      className="section-container"
      onClick={() => {
        //Hide the details when clicked outside of the frame
        showDetails && toggleDetails();
      }}
    >
      <h2 className="page-title">Projects</h2>
      <CustomSwiper 
      toggleDetails={toggleDetails} 
      showDetails={showDetails}
       />
    </section>
  );
};

export default Projects;
