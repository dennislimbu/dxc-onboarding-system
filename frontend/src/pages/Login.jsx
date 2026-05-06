import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import dxcLogo from "../assets/images/dxc-logo.svg";
import "./Login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const accounts = [
    {
      username: "testuser",
      password: "stage",
      id: 1,
      name: "Sam Smith",
      role: "USER",
      landingPage: "/dashboard",
    },
    {
      username: "testmanager",
      password: "stage",
      id: 2,
      name: "Sarah Johnson",
      role: "MANAGER",
      landingPage: "/dashboard",
    },
    {
      username: "testadmin",
      password: "stage",
      id: 3,
      name: "Olivia Green",
      role: "ADMIN",
      landingPage: "/dashboard",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    

    const foundUser = accounts.find(
      (account) =>
        account.username === username.toLowerCase().trim() &&
        account.password === password
    );

    if (!foundUser) {
      setError("Invalid username or password.");
      return;
    }

    setIsLoading(true);
        setTimeout(() => {
        login(foundUser);
        navigate(foundUser.landingPage);
        }, 2000);
  };

  return (
    <div className="login-page">
      <section className="login-hero">
        <img src={dxcLogo} alt="DXC logo" className="login-logo" />

        <div className="hero-card">
          <h1>IPE Onboarding</h1>
          <p>Track induction progress, resources and team readiness in one place.</p>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-form-card">
          <h2>Sign in</h2>
          <p>Use your prototype account details.</p>

          <form onSubmit={handleSubmit}>
            <label>
              Username
              <input
                type="text"
                placeholder="testuser"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>

            <label>
              Password
              <input
                type="password"
                placeholder="stage"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>

            {error && <span className="login-error">{error}</span>}

            <button type="submit">{isLoading ? <span className="login-loader"></span> : "Log in"}</button>
          </form>

          <div className="login-help">
            <p><strong>User:</strong> testuser</p>
            <p><strong>Manager:</strong> testmanager</p>
            <p><strong>Admin:</strong> testadmin</p>
            <p><strong>Password:</strong> stage</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;