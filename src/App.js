import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Home from "./components/Home.jsx";
import CardDetail from "./components/CardDetail.jsx";
import Catalogue from "./components/Catalogue.jsx";
import AboutUs from "./components/AboutUs.jsx";
import NavBar from "./components/NavBar.jsx";
import BooksTable from "./components/BooksTable.jsx";
import UsersTable from "./components/UsersTable.jsx";
import UsersProfile from "./components/UserProfile";
import CreateReview from "./components/CreateReview";
import MyLibrary from "./components/MyLibrary";
import ProtectedRoute from "./auth/protected-route";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import SubscribeNav from "./components/SubscribeNav";

// axios.defaults.baseURL='http://localhost:3001'
// axios.defaults.baseURL =
//   "https://pf-henrybookstore-api-production.up.railway.app";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route
        path={[
          "/home",
          "/home/:id",
          "/catalogue",
          "/about",
          "/books",
          "/users",
          "/profile",
          "/library",
        ]}
        component={NavBar}
      />
      <Route exact path="/home" component={Home} />
      <Route path="/home/:id" component={CardDetail} />
      <Route exact path="/catalogue" component={Catalogue} />
      <Route exact path="/about" component={AboutUs} />
      <Route exact path="/books" component={BooksTable} />
      <Route exact path="/users" component={UsersTable} />
      <Route exact path="/profile" component={UsersProfile} />
      <Route exact path="/library" component={MyLibrary} />
      {/* <Route path={["/home", "/catalogue", "/library",]} component={SubscribeNav} /> */}
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover={false}
        theme="light"
      />
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
