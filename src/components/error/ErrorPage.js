import React from "react";
import { Link } from "react-router-dom";

import Button from '@material-ui/core/Button';

import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';

export default function ErrorPage() {
  return(
    <div className="flx">
      <img
        src={ require("../../assets/img/error-404.png") }
        alt="Error"
        className="w-200x"
      />
      
      <h2>Ups... ¡No encontramos lo que buscas!</h2>

      <Button
        component={ Link }
        to="/"
        variant="contained"
        className="btn-rnd-i"
        title="Regresar"
        style={ {background: "#282831"} }
      >
          <ArrowBackTwoToneIcon/>
          <span className="p-5x"></span>
          <span>Regresar</span>
      </Button>
    </div>
  );
}