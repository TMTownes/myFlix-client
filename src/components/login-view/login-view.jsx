import React, { useState } from "react";

export const LoginView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    //Prevent full page reload
    event.preventDefault();

    const data = {
      access: username,
      secret: password
    };

    fetch("https://myflix-retro-af49f4e11172.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(data)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username: 
        <input 
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
      </label>
      <br/>
      <label>
        Password: 
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};