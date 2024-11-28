import { useState } from "react"

const Projects: React.FC = () => {

  //Manage if the details of the project are visible or not 
  const [showDetails, setShowDetails] = useState<boolean>(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <section className="section-container"
      onClick={() => {
        //Untoggle Details when clicked outside of the frame
        showDetails && toggleDetails()
      }}>
      <h2 className="page-title"
        onClick={() => {
          showDetails && toggleDetails()
        }}>
        Projects
      </h2>
      <div className="frame"
        onClick={() => {
          showDetails && toggleDetails()
        }}>
        <div className="frame-container">
          <img className="project-image"
            src="/assets/projects/unitconversor.md.png" alt=""
            onClick={toggleDetails}
          />
          <div className={`project-details-container ${showDetails ? 'visible' : ''}`}
            onClick={toggleDetails}
          >
            Details
          </div>
        </div>
      </div>
    </section >
  )
}

export default Projects
