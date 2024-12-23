import { v4 as uuidv4 } from "uuid";

interface Project {
  id: string;
  title: string;
  thumbnail: string;
  techStack: string[];
  src: string;
  github: string;
}

export const oldProjects: Project[] = [
  {
    id: uuidv4(),
    title: "Tagus Portus Modeling",
    thumbnail: "/assets/projects/tagus.lg.png",
    techStack: ["css", "js", "react", "ts", "vite"],
    src: "https://tagusportusmodeling.netlify.app/",
    github: "https://github.com/MarChurra/TagusPortusModeling",
  },
  {
    id: uuidv4(),
    title: "Quizzical",
    thumbnail: "/assets/projects/quizzical.lg.png",
    techStack: ["css", "js", "react"],
    src: "https://macquizzical.netlify.app/",
    github: "https://github.com/MarChurra/Quizical",
  },
  {
    id: uuidv4(),
    title: "Paimons Daily Confidence Booster",
    thumbnail: "/assets/projects/paimon.lg.png",
    techStack: ["css", "js"],
    src: "https://paimondsdailyconfidencebooster.netlify.app/",
    github: "https://github.com/MarChurra/Paimons-Daily-Confidence-Booster",
  },
  {
    id: uuidv4(),
    title: "Webflix",
    thumbnail: "/assets/projects/movie.lg.png",
    techStack: ["css", "js"],
    src: "https://flixweb.netlify.app/",
    github: "https://github.com/MarChurra/YourMovieWatchList",
  },
  {
    id: uuidv4(),
    title: "Twimba",
    thumbnail: "/assets/projects/twimba.lg.png",
    techStack: ["css", "js"],
    src: "https://twimbaxclone.netlify.app/",
    github: "https://github.com/MarChurra/twimbaXClone",
  },
  {
    id: uuidv4(),
    title: "Shopping List App",
    thumbnail: "assets/projects/companion.lg.png",
    techStack: ["css", "js", "firebase"],
    src: "https://shopping-companion.netlify.app/",
    github: "https://github.com/MarChurra/cat-shopping-cart",
  },
  {
    id: uuidv4(),
    title: "Travel Log",
    thumbnail: "assets/projects/travel.lg.png",
    techStack: ["css", "js"],
    src: "https://personaltravellog.netlify.app/",
    github: "https://github.com/MarChurra/TravelLog",
  },
  {
    id: uuidv4(),
    title: "Color Generator",
    thumbnail: "assets/projects/color.lg.png",
    techStack: ["css", "js"],
    src: "https://colorpalgenerator.netlify.app/",
    github: "https://github.com/MarChurra/ColorPalGenerator",
  },
  {
    id: uuidv4(),
    title: "OldGram",
    thumbnail: "assets/projects/oldgram.lg.png",
    techStack: ["css", "js"],
    src: "https://oldgramtemplate.netlify.app/",
    github: "https://github.com/MarChurra/Oldgram",
  },
];
