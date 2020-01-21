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
		hasHourly: false
	};


	getData() {
		let $this = this;

		const getLocation = new Promise(function (resolve, reject) {
			navigator.geolocation.getCurrentPosition(function (location) {
				$this.location = location.coords;
				$this.status.hasLocation = true;
				resolve(location.coords);
			});
		});

		getLocation.then(value => {
			let lat = value.latitude.toFixed(4);
			let long = value.longitude.toFixed(4);

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
			console.log(value);
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