import { observable, action, computed, autorun, toJS } from 'mobx';
import axios from "axios";


class dataStore {

	@observable hourly = {};
	@observable weather = {};
	@observable forecast = {};
	@observable status = {
		hasLocation: false,
		hasWeather: false,
		hasForecast: false,
		hasHourly: false,
		message: ""
	};


	getData() {
		let $this = this;

		$this.status.message = "Welcome to Stratus.";

		const getLocation = new Promise(function (resolve, reject) {
			navigator.geolocation.getCurrentPosition(function (location) {
				$this.location = location.coords;
				$this.status.hasLocation = true;
				$this.status.message = "Getting location.";
				resolve(location.coords);
			}, function(error){
				reject(error.code);
			});
		});

		getLocation.then(value => {
			let lat = value.latitude.toFixed(4);
			let long = value.longitude.toFixed(4);

			$this.status.message = "Getting data from the National Weather Service."

			// get location data
			return axios.get('https://api.weather.gov/points/' + lat + ',' + long)
				.then(response => {
					$this.weather = response.data.properties;
					$this.status.hasWeather = true;
					return response.data.properties
				});
		}).then(value => {
			// get forecast data
			axios.get(value.forecast)
				.then(response => {
					$this.forecast = response.data.properties
					$this.status.hasForecast = true;
					return response.data.properties
				});

			// get hourly data
			axios.get(value.forecastHourly)
				.then(response => {
					$this.hourly = response.data.properties
					$this.status.hasHourly = true;
					return response.data.properties
				});
		}).catch(value => {

			// on error or reject
			console.log(value);
			$this.status.message = "Please enable location services in your browser.";
		});
	}


	getTime(data) {
		let newDate = new Date(data);

		return newDate.toLocaleTimeString([], {
			hour: 'numeric'
		});
	}

}

const modelStore = new dataStore();
export default modelStore;
export { dataStore };