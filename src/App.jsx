// App.jsx

import { useEffect, useState } from "react";
import { DisplayUserName } from "./components/messages.jsx"; // curly braces for named export
import { Header, Hero } from "./components/layout.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // <-- add this line
import { initScrollAnimation, bellAnimation } from "./scripts/animations.js";

function App() {
  useEffect(() => {
    initScrollAnimation();
    bellAnimation();
  }, []);

  return (
    <>
      <Header />
      <Hero />
    </>
  );
}

export default App;
