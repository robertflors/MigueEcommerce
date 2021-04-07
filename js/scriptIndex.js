class Producto {
    constructor(nombre, serial, precio, img) {
        this.nombre = nombre;
        this.serial = serial;
        this.precio = precio;
        this.img = img;
        this.cant = 1;
    }
    sumarCantidad() {
        this.cant++;
    }
    sumarPrecio(agregado) {
        this.precio += agregado;
    }
}

const productos = [];
productos.push(new Producto("stickers", 1, 100, "img/sticker.jpg"));
productos.push(new Producto("remeras", 2, 500, "img/remera.jpg"));
productos.push(new Producto("tazas", 3, 250, "img/taza.jpg"));
productos.push(new Producto("cuadros", 4, 1000, "img/cuadro.jpg"));

const productosElegidos = [];
let tienda = document.getElementById("seleccionProductos");
let listado = document.createElement("div");
let contador = document.getElementById("contadorCarrito");
let contando = document.createElement("p");

const boton = document.getElementById("despliego");
boton.addEventListener('click', opciones);

// función que agrega productos al array del localstorage
function carroJSON(dato) {
    //si el carrito de storage no existe crea el primer elemento         
    if (!localStorage.getItem('carrito')) {
        let carritoJSON = JSON.stringify(productosElegidos);
        localStorage.setItem('carrito', carritoJSON);
    }
    //si ya hay un valor en el carrito le hace un psuh al array del storage
    else {
        const validarCarrito = JSON.parse(localStorage.getItem('carrito'));
        let buscarProducto = validarCarrito.find(obj => obj.serial == dato.serial);
        if (buscarProducto != undefined) {
            buscarProducto.cant++;            
            for (let i = 0; i < validarCarrito.length; i++) {
                if (validarCarrito[i].serial == buscarProducto.serial) {
                    validarCarrito[i].cant = buscarProducto.cant;        
                }
            }
        } else {
            validarCarrito.push(dato);
        }
        localStorage.setItem('carrito', JSON.stringify(validarCarrito));
    }
}
// función llamada en los eventos de "botonCarrito" que crea el array de los productos elegidos al presionar el botón de comprar
function seleccionarProducto(e) {
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
    for (const botonC of botonesCarrito) {
        botonC.addEventListener('click', seleccionarProducto);
        botonC.addEventListener('click', contandoCarro);
       
    }
    //ANIMACIÓN DE "TOAST" CUANDO SE ELIGE UN PRODUCTO
    // $ (".btn").click(() => {
    //     $("#toast").fadeIn(100)
    //                .delay(1000)
    //                .slideUp(100);
    // })
}

//Función que agrega un contador en el navbar a la hora de seleccionar productos en el menú
function contandoCarro(e) {
    let elementos = JSON.parse(localStorage.getItem('carrito'));
    contando.innerHTML = `${elementos.length}`
    contador.appendChild(contando);
}


$(document).ready(function () {
    let elementos = JSON.parse(localStorage.getItem('carrito'));
    contando.innerHTML = `${elementos.length}`
    contador.appendChild(contando);
});
$("#recoge").click(function (e) { 
    e.preventDefault();
    tienda.removeChild(listado);
    tienda.value = true;   
});
