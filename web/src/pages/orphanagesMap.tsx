import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";

import "leaflet/dist/leaflet.css";

import "../styles/orphanagesMap.css";

import mapMakerImg from "../images/map-marker.svg";
import api from "../service/api";

const mapIcon = Leaflet.icon({
	iconUrl: mapMakerImg,
	iconSize: [58, 68],
	iconAnchor: [29, 68],
	popupAnchor: [170, 2],
});

interface Orphanage {
	id: number;
	latitude: number;
	longitude: number;
	name: string;
}

function OrphanagesMap() {
	const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

	useEffect(() => {
		api.get("orphanages").then((response) => {
			setOrphanages(response.data);
		});
	}, []);

	return (
		<div id='page-map'>
			<aside>
				<header>
					<img src={mapMakerImg} alt='Happy' />
					<h2>Choose an orphanage on the map</h2>
					<p>Many children are waiting for your visit!</p>
				</header>

				<footer>
					<strong>Bergen</strong>
					<span>Norway</span>
				</footer>
			</aside>

			<Map
				center={[60.3889944, 5.3212103]}
				zoom={11}
				style={{ width: "100%", height: "100%" }}>
				{/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
				<TileLayer
					url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
				/>

				{orphanages.map((orphanage) => {
					return (
						<Marker
							key={orphanage.id}
							icon={mapIcon}
							position={[orphanage.latitude, orphanage.longitude]}>
							<Popup
								closeButton={false}
								minWidth={240}
								maxWidth={240}
								className='map-popup'>
								{orphanage.name}
								<Link to={`/orphanages/${orphanage.id}`}>
									<FiArrowRight size={20} color='#FFF' />
								</Link>
							</Popup>
						</Marker>
					);
				})}
			</Map>

			<Link to='/orphanages/create' className='create-orphanage'>
				<FiPlus size={32} color='#FFF' />
			</Link>
		</div>
	);
}

export default OrphanagesMap;
