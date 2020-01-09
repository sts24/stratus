import React from "react";
import ReactDOM from 'react-dom'
import { observer } from "mobx-react";
import modelStore from "./store.js"

@observer
class App extends React.Component {

	constructor(props) {
		super(props);
		this.store = this.props.store;
		this.store.getData();
	}

	componentDidMount() {

	}

	render() {
		if (this.store.hasLoaded) {
			return (
				<main>
					<h1>{this.store.weather.relativeLocation.properties.city}, {this.store.weather.relativeLocation.properties.state}</h1>

					<ul>
						{this.store.forecast.periods.map(item => (
							<li key={item.startTime}>
								{item.name}<br />
								{item.shortForecast} - {item.temperature}&#8457;
							</li>
						))}
					</ul>
				</main>
			);
		} else {
			return null
		}
	}
}


ReactDOM.render(<App store={modelStore} />, document.getElementById("app"));