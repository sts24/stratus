import React from "react";
import ReactDOM from 'react-dom'
import { observer } from "mobx-react";
import modelStore from "./store.js";
import Forecast from "./compontents/forecast";
import Current from "./compontents/current";

@observer
class App extends React.Component {

	constructor(props) {
		super(props);
		this.store = this.props.modelStore;
		this.store.getData();
	}

	componentDidMount() {

	}

	render() {
		if (this.store.hasLoaded) {
			return (
				<div id="app">
					<header>
						<h1>{this.store.weather.relativeLocation.properties.city}, {this.store.weather.relativeLocation.properties.state}</h1>
					</header>
					<main className="data-grid">
						<Current />
						<Forecast />
					</main>


				</div>
			);
		} else {
			return null
		}
	}
}


ReactDOM.render(<App modelStore={modelStore} />, document.getElementById("app"));