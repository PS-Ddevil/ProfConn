import React, { Component, Fragment } from 'react';
import Prof from './Prof';
import iitlogo from "../img/iitlogo.png";
import axios from "axios";
const config = require('../config.json');

export default class Products extends Component {

  state = {
    newprof: null,
    profs: []
  }

  fetchProfs = async () => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state
    try{
        const res = await axios.get(`${config.api.invokeUrl}/prof`);
        this.setState({profs: res.data});
    }catch(err){
        console.log(err);
    }
  }

  componentDidMount = () => {
    this.fetchProfs();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <center>
                <img src={iitlogo} width="300" height="200" alt="hexal logo" />
                <h1><b>IIT Mandi </b></h1>
            </center>
            <br />
            <div className="row">
                { 
                    this.state.profs && this.state.profs.length > 0
                    ? this.state.profs.map(prof => <Prof name={prof.name} id={prof.id} key={prof.id} designation={prof.designation} office={prof.office} residence={prof.residence} email={prof.email}/>)
                    : <div className="tile notification is-warning">No Data available</div>
                }
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}