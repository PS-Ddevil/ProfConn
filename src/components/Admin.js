import React, { Component, Fragment } from 'react';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import Prof from "./Prof";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
var crypto = require("crypto");
const config = require('../config.json');

export default class Home extends Component {
    
    state = {
        newprof: { 
          "name": "", 
          "id": "",
          "email": "",
          "residence": "",
          "office": "",
          "designation": ""
        },
        profs: []
    }

    handleAddProf = async (event) => {
        event.preventDefault();
        // add call to AWS API Gateway add product endpoint here
        try {
            var id = await crypto.randomBytes(20).toString('hex');
            const params = {
                "id": id,
                "name": this.state.newprof.name,
                "email": this.state.newprof.email,
                "designation": this.state.newprof.designation,
                "office": this.state.newprof.office,
                "residence": this.state.newprof.residence
            };
            await axios.post(`${config.api.invokeUrl}/prof/${id}`, params);
            this.setState({ profs: [...this.state.profs, this.state.newprof] });
            this.setState({ newprof: { "name": "", "id": "", "email": "", "residence": "", "office": "", "designation": "" }});
        }catch (err) {
            console.log(`An error has occurred: ${err}`);
        }
    }

    handleUpdateProf = async (id, name, email, residence, office, designation) => {
        // add call to AWS API Gateway update product endpoint here
        try {
          const params = {
            "id": id,
            "name": name,
            "email": email,
            "residence": residence,
            "office": office,
            "designation": designation
          };
          await axios.patch(`${config.api.invokeUrl}/prof/${id}`, params);
          const profToUpdate = [...this.state.profs].find(prof => prof.id === id);
          const updatedProfs = [...this.state.profs].filter(prof => prof.id !== id);
          profToUpdate.name = name;
          profToUpdate.email = email;
          profToUpdate.office = office;
          profToUpdate.designation = designation;
          profToUpdate.residence = residence;
          updatedProfs.push(profToUpdate);
          this.setState({profs: updatedProfs});
        }catch (err) {
          console.log(`Error here updating prof: ${err}, id : ${id}`);
        }
    }

    handleDeleteProf = async (id, event) => {
        event.preventDefault();
        // add call to AWS API Gateway delete product endpoint here
        try {
          await axios.delete(`${config.api.invokeUrl}/prof/${id}`);
          const updatedProfs = [...this.state.profs].filter(prof => prof.id !== id);
          this.setState({profs: updatedProfs});
        }catch (err) {
          console.log(`Unable to delete prof: ${err}`);
        }
    }

    fetchProfs = async () => {
        // add call to AWS API Gateway to fetch products here
        // then set them in state
        try {
            const res = await axios.get(`${config.api.invokeUrl}/prof`);
            const profs = res.data;
            this.setState({ profs: profs });
        } catch (err) {
            console.log(`An error has occurred: ${err}`);
        }
    }
    
    onAddProfNameChange = event => this.setState({ newprof: { ...this.state.newprof, "name": event.target.value } });
    onAddProfEmailChange = event => this.setState({ newprof: { ...this.state.newprof, "email": event.target.value } });
    onAddProfDesignationChange = event => this.setState({ newprof: { ...this.state.newprof, "designation": event.target.value } });
    onAddProfOfficeChange = event => this.setState({ newprof: { ...this.state.newprof, "office": event.target.value } });
    onAddProfResidenceChange = event => this.setState({ newprof: { ...this.state.newprof, "residence": event.target.value } });
    
    componentDidMount = () => {
        this.fetchProfs();
    }

    handleLogOut = async event => {
        event.preventDefault();
        try{
            Auth.signOut();
            this.props.auth.setAuthStatus(false);
            this.props.auth.setUser(null);
            this.props.history.push("/");
        }catch(error){
            console.log(error.message);
        }
    }
    render(){
        return (
            <Fragment>
                <div className="main-head"> 
                    <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h2 className="display-4"><FontAwesomeIcon icon={['fas', 'user']} size="lg"/> &nbsp;Admin Control Panel</h2>
                        <br></br>
                        {this.props.auth.isAuthenticated && (
                            <div>
                                <form onSubmit={event => this.handleAddProf(event)}>
                                    <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                        <input 
                                        className="form-control" 
                                        type="text"
                                        id="name"
                                        aria-describedby="nameHelp"
                                        placeholder="Enter Name"
                                        value={this.state.newprof.name}
                                        onChange={this.onAddProfNameChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="name">Designation</label>
                                        <input 
                                        className="form-control" 
                                        type="text"
                                        id="designation"
                                        aria-describedby="nameHelp"
                                        placeholder="Enter Designation"
                                        value={this.state.newprof.designation}
                                        onChange={this.onAddProfDesignationChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="name">Residence</label>
                                        <input 
                                        className="form-control" 
                                        type="text"
                                        id="address"
                                        aria-describedby="nameHelp"
                                        placeholder="Enter Residence"
                                        value={this.state.newprof.residence}
                                        onChange={this.onAddProfResidenceChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="name">Office</label>
                                        <input 
                                        className="form-control" 
                                        type="text"
                                        id="office"
                                        aria-describedby="nameHelp"
                                        placeholder="Enter Office"
                                        value={this.state.newprof.office}
                                        onChange={this.onAddProfOfficeChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="name">Email</label>
                                        <input 
                                        className="form-control" 
                                        type="text"
                                        id="email"
                                        aria-describedby="nameHelp"
                                        placeholder="Enter Email"
                                        value={this.state.newprof.email}
                                        onChange={this.onAddProfEmailChange}
                                        />
                                    </div>
                                    <div className="field">
                                    <p className="control">
                                        <button type="submit" className="btn btn-primary">
                                        Submit
                                        </button>
                                        &nbsp;
                                        <a href="/" onClick={this.handleLogOut} type="button" className="btn btn-primary">Logout</a>
                                    </p>
                                    </div>
                                </form>

                                <div className="row">
                                    { 
                                    this.state.profs.map((prof, index) => 
                                        <Prof 
                                        isAdmin={true}
                                        handleUpdateProf={this.handleUpdateProf}
                                        handleDeleteProf={this.handleDeleteProf} 
                                        name={prof.name} 
                                        office={prof.office} 
                                        residence={prof.residence}
                                        email={prof.email} 
                                        designation={prof.designation}
                                        id={prof.id}
                                        key={prof.id}
                                        />)
                                    }
                                </div>
                            </div>
                        )}
                        {!this.props.auth.isAuthenticated && (
                            <div>
                            {/* <a href="/register" type="button" className="btn btn-primary">Register</a> &nbsp; */}
                            <a href="/login" type="button" className="btn btn-primary">Login</a>
                            </div>
                        )}
                    </div>
                    </div>
                </div>
            </Fragment>
            )
        }
}