import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
// import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

//Import statement: indicates need to bundle `./index.scss`
import "./index.scss";

//Main component (will contain all others)
const MyFlixApplication = () => {
  return (
  <Container >
    <MainView />
    </Container>
  );
};

//Finds root of app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to render app in the root DOM element
root.render(<MyFlixApplication/>);

