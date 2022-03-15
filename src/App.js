import logo from "./logo.svg";
import "./App.css";
import Home from "./Home";
import Cart from "./Cart";
import {
  BrowserRouter,
  Route,
  Router,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import PlaceOrder from "./PlaceOrder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// npm i react-router-dom@5.3.0

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/Cart">
          <Cart />
        </Route>
        <Route path="/placeorder">
          <PlaceOrder />
        </Route>
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
