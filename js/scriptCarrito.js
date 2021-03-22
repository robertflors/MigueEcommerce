let carrito2 = JSON.parse(localStorage.getItem('carrito'));
let tablaCompras = document.getElementById("carroCompras");
let tablaProducto = document.createElement("table");

console.log(carrito2);

const botonE = document.getElementById("eliminarCarrito");
botonE.addEventListener('click', eliminarTabla);

function agregarAlCarrito(carro){  
    
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

function eliminarTabla (e) {
      tablaCompras.removeChild(tablaProducto);
      localStorage.removeItem('carrito');
 } 
  agregarAlCarrito(carrito2);

