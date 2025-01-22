// @ts-nocheck

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/globalStyles.css";
import "./styles/loadingScreen.css";
import "./styles/navbar.css";
import "./styles/intro.css";
import "./styles/skills.css";
import "./styles/projects.css";
import "./styles/contacts.css";
import "./styles/footer.css";

import FullpageWrapper from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FullpageWrapper />
  </StrictMode>
);
