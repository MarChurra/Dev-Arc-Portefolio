import { v4 as uuidv4 } from "uuid";

interface Project {
  id: string;
  title: string;
  thumbnailSML: string;
  thumbnailMd: string;
  thumbnailLg: string;
  techStack: string[];
  src: string;
  github: string;
}

export const oldProjects: Project[] = [
  {
    id: uuidv4(),
    title: "Tagus Portus Modeling",
    thumbnailSML: "/assets/projects/tagus.sml.png",
    thumbnailMd: "/assets/projects/tagus.md.png",
    thumbnailLg: "/assets/projects/tagus.lg.png",
    techStack: ["css", "js", "react", "ts", "vite"],
    src: "https://tagusportusmodeling.netlify.app/",
    github: "https://github.com/MarChurra/TagusPortusModeling",
  },
  {
    id: uuidv4(),
    title: "Quizzical",
    thumbnailSML: "/assets/projects/quizzical.sml.png",
    thumbnailMd: "/assets/projects/quizzical.md.png",
    thumbnailLg: "/assets/projects/quizzical.lg.png",
    techStack: ["css", "js", "react"],
    src: "https://macquizzical.netlify.app/",
    github: "https://github.com/MarChurra/Quizical",
  },
  {
    id: uuidv4(),
    title: "Paimons Daily Confidence Booster",
    thumbnailSML: "/assets/projects/paimon.sml.png",
    thumbnailMd: "/assets/projects/paimon.md.png",
    thumbnailLg: "/assets/projects/paimon.lg.png",
    techStack: ["css", "js"],
    src: "https://paimondsdailyconfidencebooster.netlify.app/",
    github: "https://github.com/MarChurra/Paimons-Daily-Confidence-Booster",
  },
  {
    id: uuidv4(),
    title: "How was the movie called?",
    thumbnailSML: "/assets/projects/movie.sml.png",
    thumbnailMd: "/assets/projects/movie.md.png",
    thumbnailLg: "/assets/projects/movie.lg.png",
    techStack: ["css", "js"],
    src: "https://cantrememberthemovie.netlify.app/",
    github: "https://github.com/MarChurra/YourMovieWatchList",
  },
  {
    id: uuidv4(),
    title: "Twimba",
    thumbnailSML: "/assets/projects/twimba.sml.png",
    thumbnailMd: "/assets/projects/twimba.md.png",
    thumbnailLg: "/assets/projects/twimba.lg.png",
    techStack: ["css", "js"],
    src: "https://twimbaxclone.netlify.app/",
    github: "https://github.com/MarChurra/twimbaXClone",
  },
  {
    id: uuidv4(),
    title: "Shopping List App",
    thumbnailSML: "/assets/projects/companion.sml.png",
    thumbnailMd: "/assets/projects/companion.md.png",
    thumbnailLg: "assets/projects/companion.lg.png",
    techStack: ["css", "js", "firebase"],
    src: "https://shopping-companion.netlify.app/",
    github: "https://github.com/MarChurra/cat-shopping-cart",
  },
];
