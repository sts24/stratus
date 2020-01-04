import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

class App extends Component {

	state = {
		location: {},
		weather: {},
		forecast: [],
		hasError: false
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidMount() {

		let $this = this;

		const getLocation = new Promise(function (resolve, reject) {
			navigator.geolocation.getCurrentPosition(function (location) {
				$this.setState({ location: location.coords });
				resolve();
			});
		});

		getLocation
			.then(function (value) {
				axios.get('https://api.weather.gov/points/' + $this.state.location.latitude + ',' + $this.state.location.longitude)
					.then(res => {
						$this.setState({ weather: res.data });

						axios.get(res.data.properties.forecast)
							.then(res => {
								$this.setState({ forecast: res.data });
							});
					});
			});

	}

	render() {
		return (
			<ul>
				{this.state.forecast.properties.periods.map(item => (
					<li>{JSON.stringify(item)}</li>
				))}
			</ul>
		);

	}
}


ReactDOM.render(<App />, document.getElementById("app"));