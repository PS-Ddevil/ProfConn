import React, { Fragment } from 'react';
import iitlogo from "../img/iitlogo.png";

var topmargin = {
  marginTop: '10%'
}

export default function Home() {
  return (
    <Fragment>
        <div className="main-head">   
            <div style = {topmargin} ></div>
            <div>
            <center><img src={iitlogo} alt="iit logo"/></center>
            <br></br>
            <center><h1><b>PROFCONN</b></h1></center>
            <br></br>
            </div>
        </div>
    </Fragment>
  )
}