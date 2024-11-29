import { v4 as uuidv4 } from 'uuid'

interface Project {
    id: string;
    title: string;
    thumbnailSmall: string;
    thumbnailLarge: string;
    techStack: string[];
    src: string;
    github: string;
}

export const oldProjects: Project[] = [
    {
        id: uuidv4(),
        title: 'Tagus Portus Modeling',
        thumbnailSmall: '/assets/projects/tagus.md.png',
        thumbnailLarge: '/assets/projects/tagus.lg.png',
        techStack: ['css', 'js', 'react', 'ts', 'vite'],
        src: 'https://tagusportusmodeling.netlify.app/',
        github: 'https://github.com/MarChurra/TagusPortusModeling'
    },
    {
        id: uuidv4(),
        title: 'Quizzical',
        thumbnailSmall: '/assets/projects/quizzical.md.png',
        thumbnailLarge: '/assets/projects/quizzical.lg.png',
        techStack: ['css', 'js', 'react'],
        src: 'https://macquizzical.netlify.app/',
        github: 'https://github.com/MarChurra/Quizical'
    },
    {
        id: uuidv4(),
        title: 'Paimons Daily Confidence Booster',
        thumbnailSmall: '/assets/projects/paimon.md.png',
        thumbnailLarge: '/assets/projects/paimon.lg.png',
        techStack: ['css', 'js'],
        src: 'https://paimondsdailyconfidencebooster.netlify.app/',
        github: 'https://github.com/MarChurra/Paimons-Daily-Confidence-Booster'
    },
    {
        id: uuidv4(),
        title: 'How was the movie called?',
        thumbnailSmall: '/assets/projects/movie.md.png',
        thumbnailLarge: '/assets/projects/movie.lg.png',
        techStack: ['css', 'js'],
        src: 'https://cantrememberthemovie.netlify.app/',
        github: 'https://github.com/MarChurra/YourMovieWatchList'
    },
    {
        id: uuidv4(),
        title: 'Twimba',
        thumbnailSmall: '/assets/projects/twimba.md.png',
        thumbnailLarge: '/assets/projects/twimba.lg.png',
        techStack: ['css', 'js'],
        src: 'https://twimbaxclone.netlify.app/',
        github: 'https://github.com/MarChurra/twimbaXClone'
    },
    {
        id: uuidv4(),
        title: 'Shopping List App',
        thumbnailSmall: '/assets/projects/companion.md.png',
        thumbnailLarge: 'assets/projects/companion.lg.png',
        techStack: ['css', 'js', 'firebase'],
        src: 'https://shopping-companion.netlify.app/',
        github: 'https://github.com/MarChurra/cat-shopping-cart'
    },
]
