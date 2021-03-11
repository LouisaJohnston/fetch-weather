import { Component } from 'react';

class Weather extends Component {
  state = {
      zipcode: '',
      temp: [],
      city: '',
      weatherDescription: '',
      maxTemp: '',
      minTemp: '',
      icon: ''
  }

  handleChange = (event) => {
    this.setState({ zipcode: event.target.value }, () => {
      console.log('Your zip code is', this.state.zipcode);
    });
  }

  handleSubmit = async (event) => {
      event.preventDefault()
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${this.state.zipcode},us&appid=052f26926ae9784c2d677ca7bc5dec98&units=imperial`)
      const json = await response.json()
      this.setState({
          city: json.name,
          weatherDescription: json.weather[0].description,
          temp: json.main.temp,
          minTemp: json.main.temp_min,
          maxTemp: json.main.temp_max,
          icon: json.weather[0].icon
      })
      console.log(json)
      console.log(json.main.temp_max)
      // Your fetch call here
    // Your state updates go under function(json)
  }
  render() {
    let iconUrl =`http://openweathermap.org/img/wn/${this.state.icon}.png`
    const fullDate = new Date()
    const weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
    const today = weekday[fullDate.getDay()]

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="zipcode">Please enter your zip code for the weather:</label>
          <input 
            id="zipcode" 
            type="text" 
            onChange={this.handleChange} 
          />
          <input type="submit" value="Get my forecast!" />
        </form>
        <div class="weather-container">
          <h3>{ this.state.city }</h3>
          <p>{ this.state.weatherDescription }</p>
          <img src={iconUrl} alt='icon'/>
          <h1>{ this.state.temp }</h1>
          <div>
              <p>{ today }</p>
        </div>
          <div class="min-max-temp">
            <p>{ this.state.maxTemp } { this.state.minTemp }</p>
          </div>
        </div>
      </div>
    )
  }
}
export default Weather;