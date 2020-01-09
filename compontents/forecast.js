import React from "react";
import modelStore from "../store.js";
import { observer } from "mobx-react";


@observer
export default class Forecast extends React.Component {

	constructor(props) {
		super(props);
		this.store = modelStore;
	}

	render() {
		if (this.store.hasLoaded) {
			return (

				<ul className="forecast-list">
					{this.store.forecast.periods.map(item => (
						<li key={item.startTime}>
							{item.name}<br />
							{item.shortForecast} - {item.temperature}&#8457;
							</li>
					))}
				</ul>
			);
		} else {
			return null
		}
	}
}