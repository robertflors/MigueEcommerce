function Producto(nombre, serial, precio, img) {
    this.nombre = nombre;
    this.serial = serial;
    this.precio = precio;
    this.img = img;
}

const productos = [];
productos.push(new Producto("stickers", 1, 100, "img/sticker.jpg"));
productos.push(new Producto("remeras", 2, 500, "img/remera.jpg"));
productos.push(new Producto("tazas", 3, 250, "img/taza.jpg"));
productos.push(new Producto("cuadros", 4, 1000, "img/cuadro.jpg"));

let productosElegidos = [];
let tienda = document.getElementById("seleccionProductos");
let listado = document.createElement("div");

const boton = document.getElementById("despliego");
boton.addEventListener('click', opciones);

const botonR= document.getElementById("recoge");
botonR.addEventListener('click', eliminarMenu);

// función que agrega productos al array del localstorage
function carroJSON (dato){ 
    //si el carrito de storage no existe crea el primer elemento         
    if (!localStorage.getItem('carrito')){ 
        let carritoJSON = JSON.stringify(productosElegidos);
        localStorage.setItem('carrito', carritoJSON); 
    }
    //si ya hay un valor en el carrito le hace un psuh al array del storage
    else {
        let validarCarrito = JSON.parse(localStorage.getItem('carrito'));       
        validarCarrito.push(dato);  
        localStorage.setItem('carrito', JSON.stringify(validarCarrito));     
    }
}
// función llamada en los eventos de "botonCarrito" que crea el array de los productos elegidos al presionar el botón de comprar
function seleccionarProducto (e){    
    let productoElegido = productos.find(obj => obj.serial == e.target.id);
    productosElegidos.push(productoElegido);
    carroJSON(productoElegido);
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
//Función para replegar el menú en el index 
function eliminarMenu(e){
tienda.removeChild(listado);
tienda.value = true;
 }