import React from "react";
import modelStore from "../store.js";
import { observer } from "mobx-react";


@observer
export default class Forecast extends React.Component {

	constructor(props) {
		super(props);
		this.store = modelStore;
	}

	isDayTime(item) {
		return item.isDaytime ? `forecast-item forecast-daytime` : `forecast-item forecast-nighttime`;
	}

	render() {
		if (this.store.hasLoaded) {
			return (
				<ul className="forecast-list">
					{this.store.forecast.periods.map(item => {
						let daytimeClass = item.isDaytime ? `forecast-daytime` : `forecast-nighttime`;

						return (
							<li className={`forecast-item ${daytimeClass}`} key={item.startTime} >
								<div className="forecast-day">{item.name}</div>
								<div className="forecast-desc">{item.shortForecast}</div>
								<div className="forecast-temp">{item.temperature}&#8457;</div>
								<div className="forecast-wind">{item.windSpeed} {item.windDirection}</div>
							</li>
						)

					})}
				</ul>
			)
		} else {
			return null
		}
	}
}