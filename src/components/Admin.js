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
          "school": "",
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
                "school": this.state.newprof.school
            };
            await axios.post(`${config.api.invokeUrl}/prof/${id}`, params);
            this.setState({ profs: [...this.state.profs, this.state.newprof] });
            this.setState({ newprof: { "name": "", "id": "", "school": "" }});
        }catch (err) {
            console.log(`An error has occurred: ${err}`);
        }
    }

    handleUpdateProf = async (id, name, school) => {
        // add call to AWS API Gateway update product endpoint here
        try {
          const params = {
            "id": id,
            "name": name,
            "school": school
          };
          await axios.patch(`${config.api.invokeUrl}/prof/${id}`, params);
          const profToUpdate = [...this.state.profs].find(prof => prof.id === id);
          const updatedProfs = [...this.state.profs].filter(prof => prof.id !== id);
          profToUpdate.name = name;
          profToUpdate.school = school;
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
    onAddProfSchoolChange = event => this.setState({ newprof: { ...this.state.newprof, "school": event.target.value } });
    
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
                                    <label htmlFor="school">School</label>
                                        <input 
                                        className="form-control" 
                                        type="text"
                                        id="school"
                                        placeholder="School"
                                        value={this.state.newprof.school}
                                        onChange={this.onAddProfSchoolChange}
                                        />
                                        <span className="icon is-small is-left">
                                        <i className="fas fa-lock"></i>
                                        </span>
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
                                        school={prof.school}
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