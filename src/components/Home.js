import React, { Fragment } from 'react';
import iitlogo from "../img/iitlogo.png";
import background from "../img/IIT.jpg";

var backstyle = {
    backgroundImage: `url(${background})`,
    width: "100%",
    height: "732px"
}

var imgStyle = {
    opacity: ".7",
    backgroundColor: "white"
}

export default function Home() {
  return (
    <Fragment>
        <div className="main-head" style = {backstyle}> 
            <br></br><br></br><br></br>
            <div style = {imgStyle} >
            <center><img src={iitlogo} alt="iit logo"/></center>
            <br></br>
            <center><h1><b>PROFCONN</b></h1></center>
            <br></br>
            </div>
        </div>
    </Fragment>
  )
}