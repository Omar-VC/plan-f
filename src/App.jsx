import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlantelSuperior from "./pages/PlantelSuperior";
import PlayersList from "./pages/PlayersList";
import Attendance from "./pages/Attendance";
import PlayerDetail from "./pages/PlayerDetail";
import Header from "./components/Header";
import { PlayersProvider } from "./context/PlayersContext";

function App() {
  return (
    <BrowserRouter>
      <PlayersProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/plantel-superior"
            element={<PlantelSuperior />}
          />

          <Route
            path="/plantel-superior/jugadores"
            element={<PlayersList />}
          />

          <Route
            path="/plantel-superior/asistencias"
            element={<Attendance />}
          />

          <Route
            path="/plantel-superior/jugadores/:id"
            element={<PlayerDetail />}
          />
        </Routes>
      </PlayersProvider>
    </BrowserRouter>
  );
}

export default App;
