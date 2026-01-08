import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PlayersProvider } from "./context/PlayersContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PlayersProvider>
      <App />
    </PlayersProvider>
  </StrictMode>
);
