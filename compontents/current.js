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
			return (

				<ul>

				</ul>
			);
		} else {
			return null
		}
	}
}