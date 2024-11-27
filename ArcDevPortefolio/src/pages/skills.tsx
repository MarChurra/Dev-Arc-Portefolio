import skills from "../mappedInfo/skills.json";

type TechExperienceType = {
  tech: string,
  experience: number,
}

const formatSkillsContent = (years: number): sting => {
  if (years < 1) return "<1 Year of Experience"
  else if (years === 1) return "1 Year of Experience"
  return `${years} Years of Experience`
}

const Skills: React.FC = () => {
  return (
    <>
      <section className="skills-container">
        <h2 className="page-logo">Skills</h2>
        <div className="skill-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-container">
              <h2 className="skill-title">{skill.tech}</h2>
              <p className="skill-experience">{formatSkillsContent(skill.experience)}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Skills;
