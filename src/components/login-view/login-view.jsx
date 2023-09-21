import React from "react";

export const LoginView = () => {
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
        <input type="text"/>
      </label>
      <br/>
      <label>
        Password: 
        <input type="password"/>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};