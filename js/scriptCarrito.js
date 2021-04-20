let carrito2 = JSON.parse(localStorage.getItem('carrito'));
let tablaCompras = document.getElementById("carroCompras");

const botonE = document.getElementById("eliminarCarrito");
botonE.addEventListener('click', eliminarTabla);
//función que genera una tabla donde se insertan los productos seleccionados, usando el localStorage
function actualizarCarrito(carro) {
  // document.getElementById('contenedorTablaCompra').removeChild(tablaCompras);
  $('#carroCompras tr').remove()
  for (const elemento of carro) {
    let tablaProducto = document.createElement("tr");
    tablaProducto.innerHTML = `<td> <img src='${elemento.img}' class='imgCarrito'></td>
                                <td> ${elemento.nombre} </td>
                                <td> ${elemento.precio} </td>
                                <td> ${elemento.cant} </td>
                                <td> <button onclick="borrarProducto('${elemento.serial}')"> borrar </button> </td>` 
    tablaCompras.append(tablaProducto);
  }
}

function borrarProducto(e) {
  var carro = {}
  // obtener estado anterior 
  // buscar elemento a borrar
  // borrar elemento
  var carroBorrado = {}
  actualizarCarrito(carroBorrado)
  localStorage.setItem(carroBorrado);
  // guardar en local storage
  // llamar a renderizar con elemento borrado
}

//función para eliminar toda la tabla generada por la elección de los productos y el localStorage
function eliminarTabla(e) {
  // document.getElementById('contenedorTablaCompra').removeChild(tablaCompras);
  localStorage.removeItem('carrito');
  const newCarrito = JSON.parse(localStorage.getItem('carrito'));
  actualizarCarrito(newCarrito);
}
actualizarCarrito(carrito2);