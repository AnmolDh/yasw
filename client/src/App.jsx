import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
      </Routes>
    </Router>
  );
}

export default App;
