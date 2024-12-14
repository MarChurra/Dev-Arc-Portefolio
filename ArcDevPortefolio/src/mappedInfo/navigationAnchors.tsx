interface navigationAnchor {
    name: string,
    label: string,
    text: string
}

const navigationAnchors: navigationAnchor[] = [
    { name: "intro", label: "Intro", text: "I" },
    { name: "skills", label: "Skills", text: "S" },
    { name: "projects", label: "Projects", text: "P" },
    { name: "contacts", label: "Contacts", text: "C" },
];

export default navigationAnchors