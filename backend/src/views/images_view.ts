import Image from "../models/image";

export default {
	render(image: Image) {
		return {
			id: image.id,
			url: `http://172.20.10.3:3333/uploads/${image.path}`,
		};
	},

	renderMany(images: Image[]) {
		return images.map((image) => this.render(image));
	},
};
