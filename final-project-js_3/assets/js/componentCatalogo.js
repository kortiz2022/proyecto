import { createCard } from "./card.js";

export function Catalogo() {
	const d = document;

	this.state = { catalogo: [] };

	this.setState = (state) => {
		this.state = state;
		this.render();
	};

	this.getState = () => this.state;

	this.template = () => {
		let productos = "";

		this.state.catalogo.forEach((producto) => {
			productos += createCard(producto);
		});

		return productos;
	};

	this.render = () => {
		const elContenedor = d.getElementById("catalogo_contenedor");
		if (!elContenedor) return;
		elContenedor.innerHTML = this.template();
	};
}
