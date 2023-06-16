import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Login/Login";
import Missions from "./Components/Missions/Missions";

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route exact path="/" element={<h1>Homepage</h1>}></Route>
          <Route exact path="/about-us" element={<h1>About</h1>}></Route>
          <Route exact path="/missions" element={<Missions />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
