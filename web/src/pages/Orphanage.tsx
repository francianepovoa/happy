import React, { useEffect, useState } from "react";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";

import L from "leaflet";

import mapMarkerImg from "../images/map-marker.svg";

import "../styles/orphanage.css";
import Sidebar from "../components/sidebar";
import api from "../service/api";

const happyMapIcon = L.icon({
	iconUrl: mapMarkerImg,
	iconSize: [58, 68],
	iconAnchor: [29, 68],
	popupAnchor: [0, -60],
});

interface Orphanage {
	latitude: number;
	longitude: number;
	name: string;
	about: string;
	instructions: string;
	opening_hours: string;
	open_on_weekends: string;
	images: Array<{
		id: number;
		url: string;
	}>;
}

interface OrphanageParams {
	id: string;
}

export default function Orphanage() {
	const params = useParams<OrphanageParams>();
	const [orphanage, setOrphanage] = useState<Orphanage>();
	const [activeImageIndex, setActiveImageIndex] = useState(0);

	useEffect(() => {
		api.get(`orphanages/${params.id}`).then((response) => {
			setOrphanage(response.data);
		});
	}, [params.id]);

	if (!orphanage) {
		return <p>Loading...</p>;
	}

	return (
		<div id='page-orphanage'>
			<Sidebar />
			<main>
				<div className='orphanage-details'>
					<img
						src={orphanage.images[activeImageIndex].url}
						alt={orphanage.name}
					/>

					<div className='images'>
						{orphanage.images.map((image, index) => {
							return (
								<button
									key={image.id}
									className={activeImageIndex === index ? "active" : ""}
									type='button'
									onClick={() => {
										setActiveImageIndex(index);
									}}>
									<img src={image.url} alt={orphanage.name} />
								</button>
							);
						})}
					</div>

					<div className='orphanage-details-content'>
						<h1>{orphanage.name}</h1>
						<p>{orphanage.about}</p>

						<div className='map-container'>
							<Map
								center={[orphanage.latitude, orphanage.longitude]}
								zoom={16}
								style={{ width: "100%", height: 280 }}
								dragging={false}
								touchZoom={false}
								zoomControl={false}
								scrollWheelZoom={false}
								doubleClickZoom={false}>
								<TileLayer
									url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
								/>
								<Marker
									interactive={false}
									icon={happyMapIcon}
									position={[orphanage.latitude, orphanage.longitude]}
								/>
							</Map>

							<footer>
								<a
									target='_blank'
									rel='noopener noreferrer'
									href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>
									See directions on Google maps
								</a>
							</footer>
						</div>

						<hr />

						<h2>Visiting instructions</h2>
						<p>{orphanage.instructions}</p>

						<div className='open-details'>
							<div className='hour'>
								<FiClock size={32} color='#15B6D6' />
								Monday to Friday
								<br />
								{orphanage.opening_hours}
							</div>
							{orphanage.open_on_weekends ? (
								<div className='open-on-weekends'>
									<FiInfo size={32} color='#39CC83' />
									Open on <br />
									the weekend
								</div>
							) : (
								<div className='open-on-weekends not-open'>
									<FiInfo size={32} color='#FF669D' />
									Closed on <br />
									the weekend
								</div>
							)}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
