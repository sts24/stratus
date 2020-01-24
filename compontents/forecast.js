import React from "react";
import modelStore from "../store.js";
import { observer } from "mobx-react";
import Loading from "./loading";

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
		if (this.store.status.hasForecast) {
			return (
				<div className="grid-col grid-forecast">
					<h2>Extended Forecast</h2>
					<ul className="forecast-list">
						{this.store.forecast.periods.map((item, index) => {
							let daytimeClass = item.isDaytime ? `forecast-daytime` : `forecast-nighttime`;

							return (
								<li className={`forecast-item ${daytimeClass}`} key={item.startTime}>
									<div className="forecast-day">{item.name}</div>
									<div className="forecast-desc">{item.shortForecast}</div>
									<div className="forecast-temp">{item.temperature}&#8457;</div>
									<div className="forecast-wind">{item.windSpeed} {item.windDirection}</div>
									<div className="forecast-full-desc">{item.detailedForecast}</div>
								</li>
							)

						})}
					</ul>
				</div>
			)
		} else {
			return <Loading text="Extended Forecast" />
		}
	}
}