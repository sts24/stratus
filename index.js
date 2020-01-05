import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

class App extends Component {

	state = {
		location: {},
		weather: {},
		forecast: [],
		hasLoaded: false
	}


	getData() {
		let $this = this;

		const getLocation = new Promise(function (resolve, reject) {
			navigator.geolocation.getCurrentPosition(function (location) {
				$this.setState({ location: location.coords });
				resolve();
			});
		});

		getLocation
			.then(function (value) {
				fetch('https://api.weather.gov/points/' + $this.state.location.latitude + ',' + $this.state.location.longitude)
					.then(res => res.json())
					.then((data) => {
						$this.setState({ weather: data })
						return data
					})
					.then(function (data) {
						fetch(data.properties.forecast)
							.then(res => res.json())
							.then((data) => {
								$this.setState({
									forecast: data,
									hasLoaded: true
								})
							})
					})
					.catch(console.log)
			});
	}

	componentDidMount() {
		this.getData();
	}

	render() {
		if (this.state.hasLoaded) {
			return (
				<main>
					<h1>{this.state.weather.properties.relativeLocation.properties.city}, {this.state.weather.properties.relativeLocation.properties.state}</h1>

					<ul>
						{this.state.forecast.properties.periods.map(item => (
							<li key={item.startTime}>
								{item.name}<br />
								{item.shortForecast} - {item.temperature}&#8457;
							</li>
						))}
					</ul>
				</main>
			);
		} else {
			return null
		}
	}
}


ReactDOM.render(<App />, document.getElementById("app"));