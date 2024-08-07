import "./App.css";
import { Route, useLocation, useHistory } from "react-router-dom";
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
//import ProtectedRoute from "./auth/protected-route";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import SubscribeNav from "./components/SubscribeNav";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min.js";
import { useAuth0 } from "@auth0/auth0-react";


// localhost axios
axios.defaults.baseURL = "https://novel-wave-api.onrender.com";

// deploy axios
// const { AXIOS_URL } = process.env;
// axios.defaults.baseURL = AXIOS_URL;


const ProtectedRoute = ({
  component: Component,
  changeBackgroundColor,
  ...rest
}) => {
  // Aquí puedes agregar lógica de autenticación si es necesario
  const { isAuthenticated, user, isLoading } = useAuth0();

  useEffect(() => {}, [isAuthenticated, isLoading]);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoading && isAuthenticated ? (
          <Component {...props} changeBackgroundColor={changeBackgroundColor} />
        ) : !isLoading && !isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <></>
        )
      }
    />
  );
};
const renderFooter = (props) => {
  // Puedes agregar las props que quieras pasar aquí

  if (window.location.pathname === "/") {
    var propFooter = {
      rgba: "rgba(0, 0, 0, 0.8)",
    };
  } else {
    var propFooter = {
      rgba: "rgba(0, 0, 0, 1)",
    };
  }

  return <Footer {...props} {...propFooter} />;
};

function App() {
  const [backgroundColor, setBackgroundColor] = useState("white");

  const location = useLocation();
  const history = useHistory();

  function changeBackgroundColor(color) {
    setBackgroundColor(color);
  }

  const paths = [
    "/home",
    "/home/:id",
    "/catalogue",
    "/about",
    "/books",
    "/users",
    "/profile",
    "/library",
    "/search",
  ];

  if (!paths.includes(location.pathname) && location.pathname !== "/") {
    history.push("/home");
  }

  return (
    <div
      className="app"
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <Route exact path="/" component={LandingPage} />
      <ProtectedRoute path={paths} component={NavBar} />
      <div className="main">
        <ProtectedRoute exact path="/home" component={Home} />
        <ProtectedRoute path="/home/:id" component={CardDetail} />
        <ProtectedRoute path="/search" component={Catalogue} />
        <ProtectedRoute exact path="/catalogue" component={Catalogue} />
        <ProtectedRoute exact path="/about" component={AboutUs} />
        <ProtectedRoute exact path="/books" component={BooksTable} />
        <ProtectedRoute exact path="/users" component={UsersTable} />
        <ProtectedRoute
          exact
          path="/profile"
          component={UsersProfile}
          changeBackgroundColor={changeBackgroundColor}
        />
        <ProtectedRoute exact path="/library" component={MyLibrary} />
      </div>
      <Route path="/" render={renderFooter} />
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
        limit={4}
      />
    </div>
  );
}

export default App;
