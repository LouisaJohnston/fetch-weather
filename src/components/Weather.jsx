import { Component } from 'react';
class Weather extends Component {
  state = {
      zipcode: '',
      temp: [],
      city: '',
      weatherDescription: '',
      maxTemp: '',
      minTemp: ''

  }
  handleChange = (event) => {
    this.setState({ zipcode: event.target.value }, () => {
      console.log('Your zip code is', this.state.zipcode);
    });
  }

  handleSubmit = async (event) => {
      event.preventDefault()
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${this.state.zipcode},us&appid=052f26926ae9784c2d677ca7bc5dec98`)
      const json = await response.json()
      const convertedTemp = Number.parseInt((json.main.temp - 273.15) * 1.8 + 32)
      const convertedMinTemp = Number.parseInt((json.main.temp_min - 273.15) * 1.8 + 32)
      const convertedMaxTemp = Number.parseInt((json.main.temp_max - 273.15) * 1.8 + 32)
      this.setState({
          city: json.name,
          weatherDescription: json.weather[0].main,
          temp: convertedTemp,
          minTemp: convertedMinTemp,
          maxTemp: convertedMaxTemp
      })
      console.log(json)
      console.log(json.main.temp_max)
      // Your fetch call here
    // Your state updates go under function(json)
  }
  render() {
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
          <h1>{ this.state.temp }</h1>
          <div class="min-max-temp">
            <p>{ this.state.maxTemp } { this.state.minTemp }</p>
          </div>
        </div>
      </div>
    )
  }
}
export default Weather;