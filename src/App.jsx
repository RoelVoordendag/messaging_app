import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [message, setMessage] = useState("");

  async function greet() {
    setGreetMsg(await invoke("send_message", { message: message }));
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <p>Welcome to conversation pit</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >

        <input
          id="greet-input"
          onChange={(e) => setMessage(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
