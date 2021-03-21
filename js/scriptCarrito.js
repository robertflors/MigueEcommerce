let carrito2 = JSON.parse(localStorage.getItem('carrito'));
console.log(carrito2);

function agregarAlCarrito(carro){
    let tablaCompras = document.getElementById("carroCompras");
    let tablaProducto = document.createElement("table");
    tablaProducto.innerHTML = ` <tr>
                                 <th colspan="2">Producto</th>
                                 <th>Precio</th>
                                </tr>`        
    for (const elemento of carro){
    tablaProducto.innerHTML += `<tr><td> <img src='${elemento.img}' class='imgCarrito'></td>
                                <td> ${elemento.nombre} </td>
                                <td> ${elemento.precio} </td></tr>`
                }  
    tablaProducto.classList.add('tablaDeCompras');               
    tablaCompras.appendChild(tablaProducto);
}
  agregarAlCarrito(carrito2);

