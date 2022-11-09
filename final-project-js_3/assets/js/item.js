export const createItem = (item) => {
	let itemStrHTML = "";

	itemStrHTML = `<div class="item">
                        <form name="del_prod_form">
                            <input name="prod_id" type="hidden" value="${item?.id}" />
                            <img class="imagen" src="${item?.thumbnail}">
                            <div class="atr_item">
                                <ul>
                                    <li> <strong> Nombre: </strong> ${item?.title} </li>
                                    <li> <strong> Precio: </strong> ${item?.price} </li>
                                    <li> <strong> Cantidad: </strong> 1 </li>
                                </ul>
                            </div>
                            <button type="button" name="btn-eliminar" class="btn btn-danger btn-eliminar"><i class="bi bi-x"></i> Eliminar </button>
                        </form>
                   </div>`;

	return itemStrHTML;
};
