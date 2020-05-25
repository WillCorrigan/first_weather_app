import React, { Component } from 'react';
import './App.css';
import Searchbox from './searchbox.js';


class App extends Component {
  constructor() {
      super()
      this.state = {
        weatherData:{},
        cityName: 'London',
        searchfield : ''
      }
    }


  runFetch() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName}&APPID=${process.env.REACT_APP_API_KEY}`)
    .then(response => response.json())
    .then(jsoned => this.setState({ weatherData: jsoned })); 
  }

  defaultValue() {
    this.setState({cityName : 'London'})
  }

  componentDidMount() {
      this.runFetch();
    }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.cityName !== prevState.cityName) {
      this.backgroundremove(prevState)
      this.runFetch()
    }
  }


  backgroundload = (weather) => {
    let weatherType = weather.weather[0].main;
    document.body.classList.add(weatherType);
  }

  backgroundremove = (prevState) => {
    if (prevState.weatherData.cod === "404") {
      return;
    } else {
        let weatherType = prevState.weatherData.weather[0].main;
        document.body.classList.remove(weatherType);  
      };
  }

  updateSearch = (event) => {
    this.setState({ searchfield: event.target.value });
  }  


  resolveSearch = (event) => {
    this.setState({ cityName: this.state.searchfield });
  }  

  resolveKeySearch = (event) => {
    if (event.key === 'Enter') {
    this.setState({ cityName: this.state.searchfield });
    }
  }

  resolveErrorSearch = (event) => {
    console.log(event)
    if (event.key === 'Enter') {
      console.log("Pressed");
      this.defaultValue();
    }
  }

  render() {
    const weather = this.state.weatherData;

    if (weather && weather.main) {
      this.backgroundload(weather)
      return(
        <div>
          <div className='tc weathernames'>
            <div className='weatherDiv'>
              <h3>{weather.name}</h3>
              <h3>{Math.round(weather.main.temp - 273.15)+ '\u00b0C'}</h3>
            </div>
          </div>
          <Searchbox resolveSearch={this.resolveSearch} updateSearch={this.updateSearch} onKeyDown={this.resolveKeySearch}/>
        </div>

        )
    } else {
      return(
        <div className='wrapper'>
          <div className='appdiv'>
            <header className='appgonewrong header'>That city doesn't exist or the API is broken</header>
          </div>
          <div className='buttondiv'>
            <button className='appbutton' onClick={this.defaultValue.bind(this)} onKeyPress={this.resolveErrorSearch}>Click to go back</button>
          </div>
        </div>
      );
    }

  };
}

export default App;