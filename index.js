import React from "react";
import ReactDOM from 'react-dom'
import { observer } from "mobx-react";
import modelStore from "./store.js";
import Forecast from "./compontents/forecast";
import Current from "./compontents/current";
import Hourly from "./compontents/hourly";

@observer
class App extends React.Component {

	constructor(props) {
		super(props);
		this.store = this.props.modelStore;
		this.store.getData();
	}

	render() {
		if (this.store.hasLoaded) {
			let loc = this.store.weather.relativeLocation.properties;
			return (
				<React.Fragment>
					<header className="app-header">
						<h1>{loc.city}, {loc.state}</h1>
					</header>
					<main className="data-grid">
						<Current />
						<Hourly />
						<Forecast />
					</main>
				</React.Fragment>
			);
		} else {
			return null
		}
	}
}


ReactDOM.render(<App modelStore={modelStore} />, document.getElementById("app"));