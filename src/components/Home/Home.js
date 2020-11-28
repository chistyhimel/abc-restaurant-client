import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import AddOrder from "../AddOrder/AddOrder";
import Report from "../Report/Report";
import "./Home.css";

const Home = () => {
  const [btnHandle, setBtnHandle] = useState(true);
  const [loggedInUser,setLoggedInUser] = useContext(UserContext);
  console.log(btnHandle);
  return (
    <div className="home-container">
      <Container>
        <h2 className="text-center pt-5 font-weight-bold ">
          Welcome, {loggedInUser.name}
        </h2>
        <div className="text-center mt-3">
          <button
            className="btn btn-lg btn-danger mr-2"
            onClick={() => setBtnHandle(!btnHandle)}
          >
            ADD ORDER
          </button>
          <button
            className="btn btn-lg btn-outline-danger ml-2"
            onClick={() => setBtnHandle(!btnHandle)}
          >
            VIEW REPORT
          </button>
        </div>
        {btnHandle ? <AddOrder></AddOrder> : <Report></Report>}
      </Container>
    </div>
  );
};

export default Home;
