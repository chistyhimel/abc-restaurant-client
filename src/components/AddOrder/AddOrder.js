import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";

const AddOrder = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [foodItems, setFoodItems] = useState([]);
  useEffect(() => {
    fetch("https://secure-eyrie-18097.herokuapp.com/foodItems")
      .then((res) => res.json())
      .then((data) => setFoodItems(data));
  }, []);

  const [selectedFoodItem, setSelectedFoodItem] = useState({
    foodItem: "",
    quantity: "",
    price: "",
  });
  const [price, setPrice] = useState(0);

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    data.name = loggedInUser.name;
    data.email = loggedInUser.email;
    data.date = new Date();
    console.log(data);
    fetch("https://secure-eyrie-18097.herokuapp.com/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          alert("Ordered Succesfully");
          data = {};
        }
      });
  };

  const handleChange = (e) => {
    const item = { ...selectedFoodItem };
    item[e.target.name] = e.target.value;
    setSelectedFoodItem(item);
  };

  useEffect(() => {
    if (selectedFoodItem.foodItem && selectedFoodItem.quantity) {
      const getFood = foodItems.find(
        (item) => item.name === selectedFoodItem.foodItem
      );
      let totalPrice = getFood.price * selectedFoodItem.quantity;
      setPrice(totalPrice);
    }
  }, [selectedFoodItem]);

  return (
    <div className="mt-2">
      <h2>Add Order</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="foodItems">Select Item</label>
          <select
            className="form-control"
            id="foodItems"
            name="foodItem"
            onChange={handleChange}
            ref={register({ required: true })}
          >
            <option>-- Select Food Item --</option>
            <option value="Tea">Tea ₹ 10</option>
            <option value="Coffee">Coffee ₹ 10</option>
            <option value="Samosa">Samosa ₹ 20</option>
            <option value="Cake">Cake ₹ 20</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            className="form-control"
            id="quantity"
            name="quantity"
            type="number"
            onChange={handleChange}
            ref={register({ required: true })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="total">Total Price</label>
          <input
            className="form-control"
            id="total"
            name="total"
            type="text"
            value={price ? price + " ₹" : 0 + " ₹"}
            onChange={handleChange}
            ref={register({ required: true })}
          />
        </div>

        <button className="btn btn-lg btn-danger" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddOrder;
