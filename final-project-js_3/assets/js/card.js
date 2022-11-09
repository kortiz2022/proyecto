export const createCard = (cards) => {
	let producto = "";

	producto = `<div class="card">
					<form name="prod_form"> 
						<input name="prod_id" type="hidden" value="${cards.id}" /> 
						<div><h2> "${cards.title}" </h2> </div>
						<div><img class="imagen" src="${cards.thumbnail}"></div>
						<p class="subtitulo">Precio: $ ${cards.price} </><br>
						<p class="subtitulo">Stock: ${cards.available_quantity}</p>
						<button type="button" name="btn-comprar" class="btn-comprar">Comprar</button>
					</form>
				</div>`;


	return producto;
};
