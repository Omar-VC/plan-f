import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlantelSuperior from "./pages/PlantelSuperior";
import PlayersList from "./pages/PlayersList";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plantel-superior" element={<PlantelSuperior />} />
        <Route path="/plantel-superior/jugadores" element={<PlayersList />} />
        <Route path="/plantel-superior/asistencias" element={<Attendance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

