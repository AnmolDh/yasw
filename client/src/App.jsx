import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Info from "./pages/Info";
import Player from "./pages/Player";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/:category/:id" element={<Info />} />
        <Route
          path="/player/:category/:mediaId/:episodeId"
          element={<Player />}
        />
      </Routes>
    </Router>
  );
}

export default App;
