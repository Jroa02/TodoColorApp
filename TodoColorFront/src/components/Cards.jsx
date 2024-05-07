import React, { useState, useEffect } from "react";
import { Card } from "../components/Card";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.css";

export const Cards = (props) => {
  Cards.propTypes = {
    user: PropTypes.object.isRequired,
  };

  const fetchData = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:9098/V1/api/orders/ordersByUser/${userId}`,
        { mode: "cors" }
      );
      const data = await response.json();
      console.log("data", data);

      return data;
    } catch (error) {
      console.error("Error fetching data", error);
      return [];
    }
  };

  const [userOrders, setUserOrders] = useState([]);
  useEffect(() => {
    fetchData(props.user).then((data) => {
      setUserOrders(data);
    });
  }, [props.user]);

  return (
    <div className="container d-flex justify-content-center align-items-center h-100">
      <div className="row mt-5">
        {userOrders.map((order) => {
          return (
            <div className="col-md-4 mb-3" key={order.numero_orden}>
              <Card
                title={`Orden #${order.numero_orden}-${
                  order.fecha_orden.split("T")[0]
                }`}
                description={order.descripcion_pedido}
                statusOrder={order.estado_pago}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
