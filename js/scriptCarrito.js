let carrito2 = JSON.parse(localStorage.getItem('carrito'));
console.log(carrito2);

function agregarAlCarrito(carro){
    let tablaCompras = document.getElementById("carroCompras");
    let tablaProducto = document.createElement("tr");        
    for (const elemento of carro){
    tablaProducto.innerHTML = ` <td> <img src='${elemento.img}' class='imgCarrito'></td>
                                <td> ${elemento.nombre} </td>
                                <td> ${elemento.precio} </td> `
                }    
    tablaCompras.appendChild(tablaProducto);
}
  agregarAlCarrito(carrito2);

