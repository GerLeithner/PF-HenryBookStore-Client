import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Home from "./components/Home.jsx";
import CardDetail from "./components/CardDetail.jsx";
import Catalogue from "./components/Catalogue.jsx";
import AboutUs from "./components/AboutUs.jsx";
import CreateBook from "./components/CreateBook.jsx";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ LandingPage } />
        <Route path="/home/:id" component={ CardDetail } />
        <Route exact path="/home" component={ Home } />
        <Route exact path="/catalogue" component={ Catalogue}/>
        <Route exact path="/aboutUs" component={ AboutUs}/>
        <Route exact path="/Create" component={ CreateBook }/>
      </Switch>
    </div>
  );
}

export default App;
