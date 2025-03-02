import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Transactions from "./pages/transactions";
import AppBar from "./component/common/AppBar";

import "./App.css";

function App() {
  return (
    <Router> 
      <div className="h-screen flex flex-col">
        <AppBar />
        <main className="flex-1 p-6 bg-gray-100">
          <Routes>
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
