import React from "react";
import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import "bootstrap/dist/css/bootstrap.min.css";
// import { store } from "./redux/store";
// import { Provider } from "react-redux";
import Container from "react-bootstrap/Container";
// import { BrowserRouter } from "react-router-dom";


//Import statement: indicates need to bundle `./index.scss`
import "./index.scss";
// import { Container } from "react-bootstrap";

//Main component (will contain all others)
const MyFlixApplication = () => {
  return (
    <React.StrictMode>
    {/* <Provider store={store}> */}
    <Container >
    <MainView />
    </Container>
    {/* </Provider> */}
    </React.StrictMode>
  );
};

//Finds root of app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to render app in the root DOM element
root.render(<MyFlixApplication/>);

