import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import L from "leaflet";

import { FiPlus } from "react-icons/fi";

import mapMarkerImg from "../images/map-marker.svg";

import "../styles/create-orphanage.css";
import Sidebar from "../components/sidebar";
import api from "../service/api";
import { useHistory } from "react-router-dom";

const happyMapIcon = L.icon({
	iconUrl: mapMarkerImg,

	iconSize: [58, 68],
	iconAnchor: [29, 68],
	popupAnchor: [0, -60],
});

export default function OrphanagesMap() {
	const history = useHistory();

	const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

	const [name, setName] = useState("");
	const [about, setAbout] = useState("");
	const [instructions, setInstructions] = useState("");
	const [opening_hours, setOpeningHours] = useState("");
	const [open_on_weekends, setOpenOnWeekends] = useState(true);
	const [images, setImages] = useState<File[]>([]);
	const [previewImages, setPreviewImages] = useState<string[]>([]);

	function handleMapClick(event: LeafletMouseEvent) {
		const { lat, lng } = event.latlng;

		setPosition({
			latitude: lat,
			longitude: lng,
		});
	}

	function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
		if (!event.target.files) {
			return;
		}
		const selectedImages = Array.from(event.target.files);

		setImages(selectedImages);

		const selectedImagesPreview = selectedImages.map((image) => {
			return URL.createObjectURL(image);
		});
		setPreviewImages(selectedImagesPreview);
	}

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();

		const { latitude, longitude } = position;

		const data = new FormData();

		data.append("name", name);
		data.append("about", about);
		data.append("latitude", String(latitude));
		data.append("longitude", String(longitude));
		data.append("instructions", instructions);
		data.append("opening_hours", opening_hours);
		data.append("open_on_weekends", String(open_on_weekends));

		images.forEach((image) => {
			data.append("images", image);
		});
		await api.post("orphanages", data);

		alert("Successful registration!");
		history.push("/app");
	}

	return (
		<div id='page-create-orphanage'>
			<Sidebar />

			<main>
				<form onSubmit={handleSubmit} className='create-orphanage-form'>
					<fieldset>
						<legend>Institution Registration</legend>

						<Map
							center={[60.3889944, 5.3212103]}
							style={{ width: "100%", height: 280 }}
							zoom={13}
							onclick={handleMapClick}>
							<TileLayer
								url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
							/>

							{position.latitude !== 0 && (
								<Marker
									interactive={false}
									icon={happyMapIcon}
									position={[position.latitude, position.longitude]}
								/>
							)}
						</Map>

						<div className='input-block'>
							<label htmlFor='name'>Name</label>
							<input
								id='name'
								value={name}
								onChange={(event) => setName(event.target.value)}
							/>
						</div>

						<div className='input-block'>
							<label htmlFor='about'>
								About<span>Max 300 characters</span>
							</label>
							<textarea
								id='name'
								maxLength={300}
								value={about}
								onChange={(event) => setAbout(event.target.value)}
							/>
						</div>

						<div className='input-block'>
							<label htmlFor='images'>Photos</label>

							<div className='images-container'>
								{previewImages.map((image) => {
									return <img key={image} src={image} alt={name} />;
								})}

								<label htmlFor='image[]' className='new-image'>
									<FiPlus size={24} color='#15b6d6' />
								</label>
							</div>

							<input
								multiple
								onChange={handleSelectImages}
								type='file'
								id='image[]'
							/>
						</div>
					</fieldset>

					<fieldset>
						<legend>Visiting</legend>

						<div className='input-block'>
							<label htmlFor='instructions'>Instructions</label>
							<textarea
								id='instructions'
								value={instructions}
								onChange={(event) => setInstructions(event.target.value)}
							/>
						</div>

						<div className='input-block'>
							<label htmlFor='opening_hours'>Opening hours</label>
							<input
								id='opening_hours'
								value={opening_hours}
								onChange={(event) => setOpeningHours(event.target.value)}
							/>
						</div>

						<div className='input-block'>
							<label htmlFor='open_on_weekends'>Open on Weekend</label>

							<div className='button-select'>
								<button
									type='button'
									className={open_on_weekends ? "active" : ""}
									onClick={() => setOpenOnWeekends(true)}>
									Yes
								</button>
								<button
									type='button'
									className={!open_on_weekends ? "active" : ""}
									onClick={() => setOpenOnWeekends(false)}>
									No
								</button>
							</div>
						</div>
					</fieldset>

					<button className='confirm-button' type='submit'>
						Confirm
					</button>
				</form>
			</main>
		</div>
	);
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
