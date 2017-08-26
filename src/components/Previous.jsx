import React, { Component } from 'react';

/*
Thanks and credit to Gainor Bostwick for showing me mapping of the
zipcode data so it would properly display
*/

class Previous extends Component {
  constructor(props){
    super(props);
    this.zipHelper = this.zipHelper.bind(this);
  };

  zipHelper() {
    let allZipCodes = this.props.prevZips.map(zip => {
      return (
        <div>
          <p>{zip.zipcode}</p>
        </div>
        )
    })
    return allZipCodes;
  };

  render(){
    return (
      <div className="previous">
        <h3>Previous Searches</h3>
        {this.zipHelper()}
      </div>
    )
  }
};

export default Previous;
