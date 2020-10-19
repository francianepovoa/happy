import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

import OrphanagesMap from "./pages/orphanagesMap";
import OrphanageDetails from "./pages/orphanageDetails";
import SelectMapPosition from "./pages/createOrphanage/selectMapPosition";
import OrphanageData from "./pages/createOrphanage/orphanageData";
import Header from "./components/header";

export default function Routes() {
	return (
		<NavigationContainer>
			<Navigator
				screenOptions={{
					headerShown: false,
					cardStyle: { backgroundColor: "#f2f3f5" },
				}}>
				<Screen name='OrphanagesMap' component={OrphanagesMap} />
				<Screen
					name='OrphanageDetails'
					component={OrphanageDetails}
					options={{
						headerShown: true,
						header: () => <Header showCancel={false} title='Orphanage' />,
					}}
				/>
				<Screen
					name='SelectMapPosition'
					component={SelectMapPosition}
					options={{
						headerShown: true,
						header: () => <Header title='Select on the map' />,
					}}
				/>
				<Screen
					name='OrphanageData'
					component={OrphanageData}
					options={{
						headerShown: true,
						header: () => <Header title='Fill in the details' />,
					}}
				/>
			</Navigator>
		</NavigationContainer>
	);
}
