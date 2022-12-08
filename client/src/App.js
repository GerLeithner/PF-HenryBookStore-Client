import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import CardDetail from "./components/CardDetail/CardDetail.jsx";
import AllCards from "./components/AllCards/AllCards";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home/:id" component={CardDetail} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/catalogue" component={AllCards}/>
      </Switch>
    </div>
  );
}

export default App;
