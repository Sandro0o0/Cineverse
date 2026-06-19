import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import "./style/Cards/cards.css";
import "./style/animations.css";
import "./style/extra/extra.css";
import "./style/main_info/main-course.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
