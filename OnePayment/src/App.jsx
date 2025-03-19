// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase"; // Import the firebase auth configuration
import { UserProvider } from "./context/AuthContext/userContext"; // Import UserProvider to wrap the app
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AppBar from "./component/common/AppBar";
import GoogleAuth from "./context/AuthContext"; // Import the GoogleAuth component

import "./App.css";

function App() {
  const [user, loading, error] = useAuthState(auth); // Track authentication state

  // If still loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  } else if (error){
    return <div>Error: {error.message}</div>;
  }

  return (
    <UserProvider>
      <Router>
        <div className="h-screen flex flex-col">
          <AppBar />
          <main className="flex-1 p-6 bg-gray-100">
            <Routes>
              <Route
                path="/login"
                element={!user ? <GoogleAuth /> : <Navigate to="/home" />}
              />
              <Route
                path="/profile"
                element={user ? <Profile /> : <Navigate to="/login" />}
              />
              <Route
                path="/home"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/transactions"
                element={user ? <Transactions /> : <Navigate to="/login" />}
              />
              <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
