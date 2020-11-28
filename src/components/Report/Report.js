import React, { useEffect, useState } from "react";

const Report = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("https://secure-eyrie-18097.herokuapp.com/allOrders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);
  console.log(orders);
  return (
    <div>
      <table className="table table-borderless text-white mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Ordered Taken By</th>
            <th scope="col">Food Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order,idx) => (
            <tr key={idx}>
                  <th scope="row">{idx + 1}</th>
                  <td>{order.name}</td>
                  <td>{order.foodItem}</td>
                  <td>{order.quantity}</td>
                  <td>{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
