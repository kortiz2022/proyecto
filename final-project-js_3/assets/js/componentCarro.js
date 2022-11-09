import { createItem } from "./item.js";

export function Carro() {
	const d = document;

	this.state = { carro: [] };

	this.setState = (state) => {
		this.state = state;
		this.render();
	};

	this.getState = () => this.state;

	this.template = () => {
		if (this.state.carro.length < 1) return "<p> Lista de compras vacía </p>";

		let productos = "";

		this.state.carro.forEach((producto) => {
			productos += createItem(producto);
		});

		return productos;
	};

	this.render = () => {
		const elContenedor = d.getElementById("carro_contenedor");
		if (!elContenedor) return;
		elContenedor.innerHTML = this.template();
	};
}
