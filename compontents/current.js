import React from "react";
import modelStore from "../store.js";
import { observer } from "mobx-react";
import Loading from "./loading";

@observer
export default class Current extends React.Component {

	constructor(props) {
		super(props);
		this.store = modelStore;
	}

	render() {
		if (this.store.status.hasHourly) {
			let currentCond = this.store.hourly.periods[0];

			return (
				<div className="grid-col grid-current">
					<h2>Currently</h2>
					<figure className="current-conditions">
						<div className="forecast-day">{currentCond.name}</div>
						<div className="forecast-desc">{currentCond.shortForecast}</div>
						<div className="forecast-temp">{currentCond.temperature}&#8457;</div>
						<div className="forecast-wind">{currentCond.windSpeed} {currentCond.windDirection}</div>
					</figure>
				</div>
			)
		} else {
			return <Loading text="Current Conditions" />
		}
	}
}