import React from "react";
import modelStore from "../store.js";
import { observer } from "mobx-react";

@observer
export default class Current extends React.Component {

	constructor(props) {
		super(props);
		this.store = modelStore;
	}

	render() {
		if (this.store.hasLoaded) {
			let currentCond = this.store.hourly.periods[0];

			return (
				<figure className="current-conditions">
					<header>Currently</header>
					<div className="forecast-day">{currentCond.name}</div>
					<div className="forecast-desc">{currentCond.shortForecast}</div>
					<div className="forecast-temp">{currentCond.temperature}&#8457;</div>
					<div className="forecast-wind">{currentCond.windSpeed} {currentCond.windDirection}</div>
				</figure>
			)
		} else {
			return null
		}
	}
}