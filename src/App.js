import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Home from "./components/Home.jsx";
import CardDetail from "./components/CardDetail.jsx";
import Catalogue from "./components/Catalogue.jsx";
import AboutUs from "./components/AboutUs.jsx";
import NavBar from "./components/NavBar.jsx";
import BooksTable from "./components/BooksTable.jsx";
import ProtectedRoute from "./auth/protected-route";


function App() {
  return (
    <div className="App">
        <Route exact path="/" component={ LandingPage } />
        <Route 
          path={["/home", "/home/:id", "/catalogue", "/about", "/books"]} 
          component={ NavBar } 
        /> 
        <Route exact path="/home" component={ Home } />
        <Route path="/home/:id" component={ CardDetail } />
        <Route exact path="/catalogue" component={ Catalogue}/>
        <Route exact path="/about" component={ AboutUs}/>
        <Route exact path="/books" component={ BooksTable }/>
    </div>
  );
}

export default App;

/* {
  <ProtectedRoute exact path="/home" component={Home} />
      <ProtectedRoute path="/home/:id" component={CardDetail} />
      <ProtectedRoute exact path="/catalogue" component={Catalogue} />
      <ProtectedRoute exact path="/about" component={AboutUs} />
      <ProtectedRoute exact path="/create" component={CreateBook} />
} */
