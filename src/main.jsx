import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const defaultExhibition = {
  id: "default",
  name: "My First Exhibition",
  artworks: [],
};

const initialiseExhibitions = () => {
  const storedExhibitions = JSON.parse(localStorage.getItem("exhibitions"));
  if (!storedExhibitions) {
    localStorage.setItem("exhibitions", JSON.stringify([defaultExhibition]));
  }
};

initialiseExhibitions();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
