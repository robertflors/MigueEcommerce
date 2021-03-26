let carrito2 = JSON.parse(localStorage.getItem('carrito'));
let tablaCompras = document.getElementById("carroCompras");

const botonE = document.getElementById("eliminarCarrito");
botonE.addEventListener('click', eliminarTabla);
//función que genera una tabla donde se insertan los productos seleccionados, usando el localStorage
function agregarAlCarrito(carro) {
  for (const elemento of carro) {
    let tablaProducto = document.createElement("tr");
    tablaProducto.innerHTML = `<td> <img src='${elemento.img}' class='imgCarrito'></td>
                                <td> ${elemento.nombre} </td>
                                <td> ${elemento.precio} </td>
                                <td> ${elemento.cant} </td>` 
    tablaCompras.append(tablaProducto);

  }
}
//función para eliminar toda la tabla generada por la elección de los productos y el localStorage
function eliminarTabla(e) {
  document.getElementById('contenedorTablaCompra').removeChild(tablaCompras);
  localStorage.removeItem('carrito');
}
agregarAlCarrito(carrito2);