import { products } from "./products.js";
import { Catalogo } from "./componentCatalogo.js";
import { Carro } from "./componentCarro.js";

const d = document;

const title = d.getElementById("title");
const elContenedor = d.getElementById("contenedor");
const elCargando = d.getElementById("cargando");
const elPaginacion = d.getElementById("paginacion");
const btnCarrito = d.getElementById("btn_carrito");
const asideCarro = d.getElementById("carro_aside")

const carro = new Carro();
const catalogo = new Catalogo();

let v_offset = 0;
const cant = 20;

const fnSiguiente = () => {
	v_offset += cant;
	obtenerProductos();
};

const fnAnterior = () => {
	if (v_offset >= cant) {
		v_offset -= cant;
		obtenerProductos();
	}
};

// d.addEventListener("DOMContentLoaded", render)

const isOk = true;

// Cada vez que se compra/elimina un producto se actualiza el estado
const customFetch = (time, task) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (isOk) {
				resolve(task);
			} else {
				reject("Error");
			}
		}, time);
	});
};

const validacionProdUnico = (prod_id, carro) => {
	return carro.find((item) => item.id == prod_id);
};

const comprarProducto = (e) => {

	e.preventDefault();

	asideCarro.classList.remove("inactivo")

	let form = e.target.parentNode;

	let formData = new FormData(form);
	
	let obj_values = Object.fromEntries(formData);

	let prod_id = obj_values.prod_id;

	// Obtener el estado actual del catalogo
	let currStateCat = catalogo.getState().catalogo;

	let findProd = currStateCat.find((prod) => prod.id == prod_id);

	let currStateCar = carro.getState().carro;

	if (!validacionProdUnico(prod_id, currStateCar)) {
		currStateCar.push(findProd);

		carro.setState({
			carro: currStateCar,
		});
	}
};

const eliminarProducto = (e) => {

	e.preventDefault();

	let form = e.target.parentNode;

	let formData = new FormData(form);

	let obj_values = Object.fromEntries(formData);

	let prod_id = obj_values.prod_id;

	// Obtener el estado actual del carro
	let prevStateCar = carro.getState().carro;

	// Eliminar el producto mediante su id
	let currStateCar = prevStateCar.filter((item) => item.id != prod_id);

	carro.setState({
		carro: currStateCar,
	});
};

d.addEventListener("click", function (e) {

	if (e.target && e.target.name == "btn-comprar") {
		comprarProducto(e);
	}

	if (e.target && e.target.name == "btn-eliminar") {
		eliminarProducto(e);
	}

});

btnCarrito.addEventListener("click", function() {



	if ( asideCarro.classList.contains("inactivo") ) {
		asideCarro.classList.remove("inactivo")
	} else {
		asideCarro.classList.add("inactivo")	
	}

})

const obtenerProductos = async () => {

	title.innerHTML = "Shopin Mercado de Productos";
	elCargando.innerHTML =
		"<div style='text-align:center;'><img src='./assets/img/spin.gif' width='60'></div>";

	try {
		const respuestaML = await axios.get(
			"https://api.mercadolibre.com/sites/MLC/search",
			{
				params: {
					q: "licor",
					offset: v_offset,
					limit: cant,
				},
			}
		);

		if (respuestaML.status === 200) {
			let datos = respuestaML.data.results;

			// Mezcla con productos hardcodeados
			if (v_offset === 0) {

				const respuestaHC = await customFetch(1000, products);

				datos = datos.concat(respuestaHC);
			}

			elCargando.innerHTML = "";

			catalogo.setState({ catalogo: datos });

			//Botones de paginacion
			let paginacion = document.createElement("div");
			paginacion.classList.add("paginacion");

			//btn anterior
			let btnAnterior = document.createElement("button");
			btnAnterior.innerHTML = "<< Anterior";
			btnAnterior.addEventListener("click", fnAnterior);

			//btn siguiente
			let btnSiguiente = document.createElement("button");
			btnSiguiente.innerHTML = "Siguiente >>";
			btnSiguiente.addEventListener("click", fnSiguiente);
			paginacion.append(btnAnterior);
			paginacion.append(btnSiguiente);

			elPaginacion.innerHTML = "";
			elPaginacion.append(paginacion);
		}
	} catch (e) {
		elCargando.innerHTML = "";
		elContenedor.innerHTML = "<div class='card-error'>Error: " + e + "</div>";
	}
};

obtenerProductos();
