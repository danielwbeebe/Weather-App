import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header'
import Previous from './components/Previous'
import Search from './components/Search'
import Footer from './components/Footer'
import * as firebase from 'firebase';

class App extends Component {

  constructor() {
    super();
    this.state = {
      weatherLoaded: false,
      previousLoaded: false,
      zipcode: 0,
      city: null,
      temp: null,
      maxtemp: null,
      mintemp: null,
      description: null,
      humidity: null,
      pressure: null,
      windspeed: null,
      prevZips: []
    }

  var config = {
    apiKey: "AIzaSyDAW2WCmPZneQIBE1C2jRd7FPexly1nSc8",
    authDomain: "weather-searches-app-c5913.firebaseapp.com",
    databaseURL: "https://weather-searches-app-c5913.firebaseio.com",
    projectId: "weather-searches-app-c5913",
    storageBucket: "",
    messagingSenderId: "707927521059"
  };

  firebase.initializeApp(config);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderWeatherDetails() {
    if (this.state.weatherLoaded) {
      return <Search zipcode={this.state.zipcode} city={this.state.city} temp={this.state.temp} max={this.state.maxtemp} min={this.state.mintemp} description={this.state.description} humidity={this.state.humidity} pressure={this.state.pressure} windspeed={this.state.windspeed}/>
    } else {
      return <h3>Weather will display below...</h3>;
    }
  }

  componentDidMount(){
    axios.get('https://weather-searches-app-c5913.firebaseio.com/.json')
/*
Found method Object.values to access the underlying zipcodes in the Google database at:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
*/
    .then(zipdata => {
      this.setState({ prevZips: Object.values(zipdata.data) });
    })
    .catch(err => console.log(err));
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log(`The submitted ZIP code is ` + this.state.value);
    this.setState({
      zipcode: this.state.value
    })
    if (this.state.value.length === 5) {
      (this.state.weatherLoaded: true)
    } else {
      return;
    }
    fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${this.state.value},us&units=imperial&appid=a9c64fee4f3d63e1bc3db68be4803ec6`)
      .then(res => res.json())
      .then(jsonRes => {
        this.setState({
          weatherLoaded: true,
          city: jsonRes.name,
          temp: jsonRes.main.temp,
          maxtemp: jsonRes.main.temp_max,
          mintemp: jsonRes.main.temp_min,
          description: jsonRes.weather[0].description,
          humidity: jsonRes.main.humidity,
          pressure: jsonRes.main.pressure,
          windspeed: jsonRes.wind.speed
        })
      })
      axios.post('https://weather-searches-app-c5913.firebaseio.com/.json', {
        zipcode: this.state.value
      }).then(res => console.log(res))
      .catch(err => console.log(err));
      event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <div>
            <Previous className="previous" prevZips={this.state.prevZips} />
          </div>

          <div className="search">
            <h2>Enter ZIP Code</h2>

              <form onSubmit={this.handleSubmit}>
                <label>
                  <input id="form" type="number" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input id="button" type="submit" value="Submit" />
              </form>
            {this.renderWeatherDetails()}
          </div>

        </main>
        <Footer />
      </div>
    );
  }
}

export default App;

