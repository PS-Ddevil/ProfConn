import React, { Component }  from 'react';

export default class Prof extends Component {
  render() {
    return (
        <div className="col-md-6 col-sm-12 col-xs-12 col-lg-6">
        <div className="card text-white bg-info mb-3">
            <div className="card-header">{ this.props.name }</div>
            <div className="card-body">
                <h5 className="card-title">Info card title</h5>
                <p className="card-text">id: { this.props.school }</p>
            </div>
        </div> 
        </div>
    )
  }
}