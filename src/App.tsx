import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const [loginMsg, setLoginMsg] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  async function login() {
    setLoginMsg(`Hi ${name} we will try to log you in right now...`);

    await invoke("login_user", { name: name })
      .then((response) => {
        navigate("/rooms", { state: { response } });
      })
      .catch((error) => {
        console.error(error);
        setLoginMsg(`We currenctly can not log you in...`);
      });
  }

  return (
    <div className="container">
      <h1>Welcome to Messaging App!</h1>

      <p>Fill in your username to create or start with your first apps</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Login</button>
      </form>

      <p>{loginMsg}</p>
    </div>
  );
}

export default App;
