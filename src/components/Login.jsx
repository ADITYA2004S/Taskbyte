import React, { useState } from "react";
import { User } from "lucide-react";
import { saveUsername } from "../utils/localStorage";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsLoading(true);
      // Simulate loading for better UX
      setTimeout(() => {
        saveUsername(username);
        onLogin(username);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>

      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <User size={32} />
          </div>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Enter your username to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              placeholder="Enter your username"
              required
            />
          </div>

          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? (
              <div className="loading-content">
                <div className="spinner"></div>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
