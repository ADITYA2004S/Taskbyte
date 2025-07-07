import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import TaskDashboard from "./components/TaskDashboard";
import { getUsername } from "./utils/localStorage";
import "./styles/App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const savedUsername = getUsername();
    if (savedUsername) {
      setUsername(savedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <TaskDashboard username={username} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
