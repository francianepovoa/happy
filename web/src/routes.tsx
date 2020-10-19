import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./pages/landing";
import OrphanagesMap from "./pages/orphanagesMap";
import CreateOrphanages from "./pages/CreateOrphanage";
import Orphanage from "./pages/Orphanage";

function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Landing} />
				<Route path='/app' component={OrphanagesMap} />

				<Route path='/orphanages/create' component={CreateOrphanages} />
				<Route path='/orphanages/:id' component={Orphanage} />
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;
