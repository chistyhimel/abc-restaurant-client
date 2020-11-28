import { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddOrder from "./components/AddOrder/AddOrder";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Report from "./components/Report/Report";
export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <PrivateRoute path="/home">
            <Home></Home>
          </PrivateRoute>

          <Route path="/login">
            <Login></Login>
          </Route>

          <Route path="/add-order">
            <AddOrder></AddOrder>
          </Route>

          <Route path="/view-report">
            <Report></Report>
          </Route>

          <PrivateRoute exact path="/">
            <Home></Home>
          </PrivateRoute>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
