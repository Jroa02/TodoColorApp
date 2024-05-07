import React from "react";
import PropTypes from "prop-types";
import imagen1 from "./../assets/image1.jpg";
import redImage from "./../assets/RedImage.jpg";
import greenImage from "./../assets/GreenImage.jpg";
import "animate.css/animate.min.css";
import "./Cards.css";

export const Card = (props) => {
  Card.propTypes = {
    title: PropTypes.object.isRequired,
    description: PropTypes.object.isRequired,
    statusOrder: PropTypes.object.isRequired,
  };
  console.log("statusOrder", props.statusOrder);

  return (
    <div className="card text-center bg-dark animate__animated animate__fadeInUp">
      <div className="overflow">
        <img
          src={props.statusOrder === "PAGO" ? greenImage : redImage}
          alt=""
          className="card-img-top"
        />
      </div>
      <div className="card-body text-light">
        <h4 className="card-title">{props.title}</h4>
        <p className="card-text text-secondary">
          {props.title === null ? "No hay información" : props.description}
        </p>
        <a href="" className="btn btn-outline-secondary rounded-0">
          Ver Información
        </a>
      </div>
    </div>
  );
};
