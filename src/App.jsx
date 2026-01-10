import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlantelSuperior from "./pages/PlantelSuperior";
import PlayersList from "./pages/PlayersList";
import Attendance from "./pages/Attendance";
import PlayerDetail from "./pages/PlayerDetail";
import Plan from "./pages/Plan"; // ✅ importamos la nueva página
import Header from "./components/Header";
import BottomNavbar from "./components/BottomNavbar";
import { PlayersProvider } from "./context/PlayersContext";
import { PlanProvider } from "./context/PlanContext"; // ✅ importamos el nuevo contexto

function App() {
  return (
    <BrowserRouter>
      <PlayersProvider>
        <PlanProvider> {/* ✅ envolvemos con el nuevo contexto */}
          <Header />

          <div className="min-h-screen pb-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/plantel-superior" element={<PlantelSuperior />} />
              <Route path="/plantel-superior/jugadores" element={<PlayersList />} />
              <Route path="/plantel-superior/asistencias" element={<Attendance />} />
              <Route path="/plantel-superior/jugadores/:id" element={<PlayerDetail />} />
              <Route path="/plantel-superior/plan" element={<Plan />} /> {/* ✅ nueva ruta */}
            </Routes>
          </div>

          <BottomNavbar />
        </PlanProvider>
      </PlayersProvider>
    </BrowserRouter>
  );
}

export default App;

