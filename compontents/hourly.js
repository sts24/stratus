import React from "react";
import modelStore from "../store.js";
import { observer } from "mobx-react";


@observer
export default class Hourly extends React.Component {

	constructor(props) {
		super(props);
		this.store = modelStore;
	}

	render() {
		if (this.store.hasLoaded) {
			let hourlyCond = this.store.hourly.periods;

			return (
				<ul className="hourly-list">
					{hourlyCond.slice(1, 12).map(item => {
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
			)
		} else {
			return null
		}
	}
}