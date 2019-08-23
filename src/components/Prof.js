import React, { Component }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Prof extends Component {
  state = {
    isEditMode: false,
    updatedprofname: this.props.name,
    updateddesignationname: this.props.designation,
    updatedemail: this.props.email,
    updatedoffice: this.props.office,
    updatedresidence: this.props.residence
  }

  closeEdit = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
  }

  handleProfEdit = event => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  } 

  handleEditSave = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdateProf(this.props.id, this.state.updatedprofname, this.state.updatedemail, this.state.updatedresidence, this.state.updatedoffice, this.state.updateddesignationname);
  }

  onAddProfNameChange = event => this.setState({ "updatedprofname": event.target.value });
  onAddProfDesignationChange = event => this.setState({ "updateddesignationname": event.target.value });
  onAddProfEmailChange = event => this.setState({ "updatedemail": event.target.value });
  onAddProfOfficeChange = event => this.setState({ "updatedoffice": event.target.value });
  onAddProfResidenceChange = event => this.setState({ "updatedresidence": event.target.value });

  render() {
    return (
        <div className="col-md-6 col-sm-12 col-xs-12 col-lg-6">
        {
          this.props.isAdmin && 
          <div>
            <div className="card-header">
            <span>Modify: &nbsp;&nbsp;&nbsp;&nbsp;</span>
            <a href="/" onClick={this.handleProfEdit}>
              <FontAwesomeIcon icon="edit" />
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href="/" onClick={event => this.props.handleDeleteProf(this.props.id, event)}>
              <FontAwesomeIcon icon={['fa', 'ban']} />
            </a>
            </div>
          </div>
        }
        {
          this.state.isEditMode 
          ? <div className="card text-white bg-info mb-3">
              <div className="form-group">
              <label htmlFor="name">Edit Professor Name</label>
              <input 
                id="name"
                className="form-control"
                type="text" 
                placeholder="Enter name"
                value={this.state.updatedprofname}
                onChange={this.onAddProfNameChange}
              />
              </div>
              <div className="form-group">
              <label htmlFor="designation">Edit Designation</label>
              <input 
                id="designation"
                className="form-control"
                type="text" 
                placeholder="Enter Designation"
                value={this.state.updateddesignationname}
                onChange={this.onAddProfDesignationChange}
              />
              </div>
              <div className="form-group">
              <label htmlFor="residence">Edit Residence</label>
              <input 
                id="residence"
                className="form-control"
                type="text" 
                placeholder="Enter residence"
                value={this.state.updatedresidence}
                onChange={this.onAddProfResidenceChange}
              />
              </div>
              <div className="form-group">
              <label htmlFor="office">Edit Office</label>
              <input 
                id="office"
                className="form-control"
                type="text" 
                placeholder="Enter office"
                value={this.state.updatedoffice}
                onChange={this.onAddProfOfficeChange}
              />
              </div>
              <div className="form-group">
              <label htmlFor="email">Edit Email</label>
              <input 
                id="email"
                className="form-control"
                type="text" 
                placeholder="Enter email"
                value={this.state.updatedemail}
                onChange={this.onAddProfEmailChange}
              />
              </div>
              {/* <p className="product-id">id: { this.props.id }</p> */}
              <div className="row">
                <div className="col-6">
                  <center>
                  <button type="submit" 
                  className="btn btn-primary"
                  onClick={ this.handleEditSave }
                  >Save</button>
                  </center>
                </div>
                <div className="col-6">
                  <center>
                  <a href="/" type="button" 
                  className="btn btn-primary"
                  onClick={ this.closeEdit}
                  >Close</a>
                  </center>
                </div>
              </div>
            </div>
            : <div className="card">
              <div className="card-header">
                {this.props.designation}
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-8 col-sm-12">
                    <h5 className="card-title">{ this.props.name }</h5>
                  </div>
                  <div className="col-lg-4 col-sm-12">
                    <h6>({ this.props.email })</h6>
                  </div>
                </div>
                <p className="card-text">{ this.props.office }<br></br>{ this.props.residence }</p>
              </div>
            </div>
          
}    
        </div>
    )
  }
}