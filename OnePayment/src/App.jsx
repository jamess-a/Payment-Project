import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard1 from "./pages/Dashboard";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="Payment-Project/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard1 />} />
      </Routes>
    </Router>
  );
}

export default App;
