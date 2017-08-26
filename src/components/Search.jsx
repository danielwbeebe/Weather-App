import React, { Component } from 'react';

class Search extends Component {
  render(){
    return (
      <div className="weather-details">
        <span id='zipcode'>Weather for {this.props.zipcode}</span>
        <span id='city'>{this.props.city}</span>
        <div className="temps">
          <span id='temp'>{this.props.temp} &#8457;</span>
            <div className="maxmin">
              <span id='max'>Max: {this.props.max} &#8457;</span>
              <span id='min'>Min: {this.props.min} &#8457;</span>
            </div>
        </div>
        <span id='description'>Description: {this.props.description} </span>
        <div className="minor-details">
          <span id='humidity'>Humidity: {this.props.humidity}%</span>
          <span id='pressure'>Pressure: {this.props.pressure}mb </span>
          <span id='windspeed'>Windspeed: {this.props.windspeed}mph </span>
        </div>
      </div>
    )
  }
}

export default Search;
