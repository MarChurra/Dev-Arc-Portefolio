import skills from "../mappedInfo/skills.json";

type TechExperienceType = {
  tech: string,
  experience: number,
}

//Format the text in the paragraph
const formatSkillsContent = (years: number): string => {
  if (years < 1) return "<1 Year of Experience"
  else if (years === 1) return "1 Year of Experience"
  return `${years} Years of Experience`
}

//Maps over the skills object
const Skills: React.FC<TechExperienceType> = () => {
  return (
    <>
      <section className="section-container">
        <h2 className="page-title">Skills</h2>
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
