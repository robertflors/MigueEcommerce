function Producto(nombre, serial, precio, img) {
    this.nombre = nombre;
    this.serial = serial;
    this.precio = precio;
    this.img = img;
}

const productos = [];
let productosElegidos = [];
let carro = [];
let tienda = document.getElementById("seleccionProductos");
let listado = document.createElement("div");

productos.push(new Producto("stickers", 1, 100, "img/sticker.jpg"));
productos.push(new Producto("remeras", 2, 500, "img/remera.jpg"));
productos.push(new Producto("tazas", 3, 250, "img/taza.jpg"));
productos.push(new Producto("cuadros", 4, 1000, "img/cuadro.jpg"));

const boton = document.getElementById("despliego");
boton.addEventListener('click', opciones);

// función que transforma a JSON un array de objetos
function carroJSON (dato){
    let carritoJSON = JSON.stringify(dato);
    console.warn(carritoJSON);
    localStorage.setItem('carrito', carritoJSON);
}
// función llamada en los eventos de "botonCarrito" que crea el array de los productos elegidos al presionar el botón de comprar
function seleccionarProducto (e){
    
    let productoElegido = productos.find(obj => obj.serial == e.target.id);
    console.log(productoElegido);
    productosElegidos.push(productoElegido);
    console.log(productosElegidos);
    // carroJSON(productosElegidos);
    carro = productosElegidos;
    carroJSON(carro);
   }

//función asociada al evento que despliega por el DOM las opciones de compra 
function opciones(e) {
    let menu = '';
       // condicional para que se despliegue una sola vez el menú.
       if (tienda.value != false) {
        for (let producto of productos) {
                menu += `<div class='card' style='width: 18rem;'>
                         <img src='${producto.img}' class='card-img-top'>
                         <div class='card-body'>
                         <h5 class='card-title'>${producto.nombre}</h5>
                         <p class='card-text'>$ ${producto.precio}</p>
                         <button class='btn botonComprar' id='${producto.serial}'><img id='${producto.serial}' src='img/carrito.png'></button>
                         </div>
                         </div>`
          } 
         listado.classList.add('seccionDeTienda--flexible'); 
         listado.innerHTML = menu;        
         tienda.appendChild(listado);                
        }  
        // para que en el condicional no se sigan desplegando menúes cada vez que suceda el evento
        tienda.value = false;

        let botonesCarrito = document.getElementsByClassName("btn");
        for (const botonC of botonesCarrito){
        botonC.addEventListener('click' , seleccionarProducto);
        }       
    }
   
    const botonR= document.getElementById("recoge");
    botonR.addEventListener('click', eliminarMenu);

 function eliminarMenu(e){
    tienda.removeChild(listado);
    tienda.value = true;
 }



//  ahora que tengo el JSON del carrito en el storage, probar hacer un parse a ese array para generar el HTML del carrito
// hacer un JS para carrito específicamente con las funciones para extraer la info del storage y generar el nuevo DOM
// a su vez probar el método que usé para eleminar el menú desplegado, pero para eliminar items del carrito con un botón
// X o algo por el estilo, probar con JQUERY para a su vez agregar los elementos al carrito al revés con "prepend"
// en lugar del append 