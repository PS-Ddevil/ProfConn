import React, { Component }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Prof extends Component {
  state = {
    isEditMode: false,
    updatedprofname: this.props.name,
    updatedschoolname: this.props.school
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
    this.props.handleUpdateProf(this.props.id, this.state.updatedprofname, this.state.updatedschoolname);
  }

  onAddProfNameChange = event => this.setState({ "updatedprofname": event.target.value });

  onAddProfSchoolChange = event => this.setState({ "updatedschoolname": event.target.value });

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
              <label htmlFor="school">Edit School Name</label>
              <input 
                id="school"
                className="form-control"
                type="text" 
                placeholder="Enter school name"
                value={this.state.updatedschoolname}
                onChange={this.onAddProfSchoolChange}
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
          : <div className="card text-white bg-info mb-3">
            <div className="card-header">{ this.props.name }</div>
            <div className="card-body">
                <h5 className="card-title">Info card title</h5>
                <p className="card-text">school: { this.props.school }</p>
            </div>
        </div>
}    
        </div>
    )
  }
}