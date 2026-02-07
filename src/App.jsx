import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import PlantelSuperior from "./pages/PlantelSuperior";
import PlayersList from "./pages/PlayersList";
import Attendance from "./pages/Attendance";
import PlayerDetail from "./pages/PlayerDetail";
import Plan from "./pages/Plan";
import Header from "./components/Header";
import BottomNavbar from "./components/BottomNavbar";
import { PlayersProvider } from "./context/PlayersContext";
import { PlanProvider } from "./context/PlanContext";

function App() {
  return (
    <BrowserRouter>
      <PlayersProvider>
        <PlanProvider>
          <Header />

          <div className="min-h-screen pb-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:division" element={<PlantelSuperior />} />
              <Route path="/:division/jugadores" element={<PlayersList />} />
              <Route path="/:division/asistencias" element={<Attendance />} />
              <Route path="/:division/jugadores/:id" element={<PlayerDetail />} />
              <Route path="/:division/plan" element={<Plan />} />
            </Routes>
          </div>

          <BottomNavbar />
        </PlanProvider>
      </PlayersProvider>
    </BrowserRouter>
  );
}

export default App;
