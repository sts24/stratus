import React from "react";
import modelStore from "../store.js";
import { observer } from "mobx-react";
import Loading from "./loading";

@observer
export default class Hourly extends React.Component {

	constructor(props) {
		super(props);
		this.store = modelStore;
	}

	render() {
		if (this.store.status.hasHourly) {
			let hourlyCond = this.store.hourly.periods;

			return (
				<React.Fragment>
					<h2>Next 12 Hours</h2>
					<ul className="hourly-list">
						{hourlyCond.slice(1, 13).map(item => {
							let daytimeClass = item.isDaytime ? `forecast-daytime` : `forecast-nighttime`;

							return (
								<li className={`hourly-item ${daytimeClass}`} key={item.startTime} >
									<time>{this.store.getTime(item.startTime)}</time>
									<div className="hourly-desc">{item.shortForecast}</div>
									<div className="hourly-temp">{item.temperature}&#8457;</div>
									<div className="hourly-wind">{item.windSpeed} {item.windDirection}</div>
								</li>
							)

						})}
					</ul>
				</React.Fragment>
			)
		} else {
			return <Loading text="Hourly Forecast" />
		}
	}
}