let carrito2 = JSON.parse(localStorage.getItem('carrito'));

function subTotal(elemento) {
  return (elemento.precio * elemento.cant);
}

function precioTotal(elementos){
  $("#totalCompra p").remove();
  let acum = 0;
  for (const elemento of elementos) {
    acum += (elemento.precio * elemento.cant);   
  }
  $("#totalCompra").append(`<p class="montoCompra">${acum}</p>`);
   
}

//función que genera una tabla donde se insertan los productos seleccionados, usando el localStorage
function actualizarCarrito(carro) {
  $("#carroCompras tr").remove();
  
  for (const elemento of carro) {
   $("#carroCompras").prepend(
                                `<tr>
                                <td> <img src='${elemento.img}' class='imgCarrito'></td>
                                <td> ${elemento.nombre} </td>
                                <td> ${elemento.precio} </td>
                                <td> ${elemento.cant} </td>
                                <td> ${subTotal(elemento)} </td>
                                <td> <button onclick="borrarProducto('${elemento.serial}')" class="botonEliminar"><img src="./img/papelera.png" class="botonEliminar--Img"></button> </td>
                                </tr>` ); 
  }
  

}
// función para borrar cada producto del carrito por separado
function borrarProducto(e) {
  const carro = JSON.parse(localStorage.getItem('carrito'));
  let carroBorrado = [];
  let elemento = carro.find((obj) => obj.serial == e);
  let indice = carro.indexOf(elemento);
  carro.splice(indice, 1); 
  carroBorrado = JSON.stringify(carro);
  actualizarCarrito(carro);
  localStorage.setItem("carrito", carroBorrado);
  contandoCarro();
  precioTotal(carro);
}

actualizarCarrito(carrito2);
precioTotal(carrito2);

// botón para eliminar los productos del carrito
$("#eliminarCarrito" ).click(function () { 
  $("#carroCompras tr").remove();
  localStorage.removeItem("carrito");
  $("#totalCompra p").remove();
  $("#contadorCarrito").empty();
  
});
// evento que "limpia" el carrito una vez se haya enviado correctamente el formulario
$("#compraRealizada").submit(function (e) { 
  e.preventDefault();
   $("#carroCompras tr").remove();
  localStorage.removeItem("carrito");
  $("#totalCompra p").remove();
  $("#contadorCarrito").empty();
  $("#exampleModal").modal("hide")
  
});