import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlantelSuperior from "./pages/PlantelSuperior";
import PlayersList from "./pages/PlayersList";
import Attendance from "./pages/Attendance";
import PlayerDetail from "./pages/PlayerDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plantel-superior" element={<PlantelSuperior />} />
        <Route path="/plantel-superior/jugadores" element={<PlayersList />} />
        <Route path="/plantel-superior/asistencias" element={<Attendance />} />
        <Route
          path="/plantel-superior/jugadores/:id"
          element={<PlayerDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
