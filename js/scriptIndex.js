class Producto {
  constructor(nombre, serial, precio, img, tipo) {
    this.nombre = nombre;
    this.serial = serial;
    this.precio = precio;
    this.img = img;
    this.tipo = tipo;
    this.cant = 1;
  }
  sumarCantidad() {
    this.cant++;
  }
  sumarPrecio(agregado) {
    this.precio += agregado;
  }
}

// función para cargar, desde unos JSON estáticos, las diferentes categorías de productos disponibles
function todosLosProductos(then) {
  $.getJSON("./productos/productos.json", function (productos) {
    for (const producto of productos) {
      productoRemera.push(
        new Producto(
          producto.nombre,
          producto.serial,
          producto.precio,
          producto.img,
          producto.tipo
        )
      );
    }

    then();
  });
}

const productoRemera = [];
// const productoSticker = [];
// const productoToteBag = [];

const productosElegidos = [];
let contenedorRemeras = document.getElementById("seleccionProductos");
let contenedorStickers = document.getElementById("seccionStickers");
let contenedorTotes = document.getElementById("seccionToteBag");

let listadoRemeras = document.createElement("div");
let listadoStickers = document.createElement("div");
let listadoTotes = document.createElement("div");

let contador = document.getElementById("contadorCarrito");
let contando = document.createElement("p");

// const boton = document.getElementById("despliego");
// boton.addEventListener('click', opciones);

// función llamada en los eventos de "botonCarrito" que crea el array de los productos elegidos al presionar el botón de comprar
function seleccionarProducto(e) {
  let productoElegido = productoRemera.find((obj) => obj.serial == e.target.id);
  productosElegidos.push(productoElegido);
  carroJSON(productoElegido);
}
function seleccionarProducto2(e) {
  let productoElegido = productoRemera.find((obj) => obj.serial == e.target.id);
  productosElegidos.push(productoElegido);
  carroJSON(productoElegido);
}
function seleccionarProducto3(e) {
  let productoElegido = productoRemera.find((obj) => obj.serial == e.target.id);
  productosElegidos.push(productoElegido);
  carroJSON(productoElegido);
}
// función que agrega productos al array del localstorage
function carroJSON(dato) {
  //si el carrito de storage no existe crea el primer elemento
  if (!localStorage.getItem("carrito")) {
    let carritoJSON = JSON.stringify(productosElegidos);
    localStorage.setItem("carrito", carritoJSON);
  }
  //si ya hay un valor en el carrito le hace un psuh al array del storage
  else {
    const validarCarrito = JSON.parse(localStorage.getItem("carrito"));
    let buscarProducto = validarCarrito.find(
      (obj) => obj.serial == dato.serial
    );
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
    localStorage.setItem("carrito", JSON.stringify(validarCarrito));
  }
}
//función asociada al evento que despliega por el DOM las opciones de compra
function opciones(e) {}
//Función que agrega un contador en el navbar a la hora de seleccionar productos en el menú
function contandoCarro() {
  let elementos = JSON.parse(localStorage.getItem("carrito"));

  //   let total = elementos.reduce((accum, curr) => accum + curr.cant, 0);
  let total = 0;
  for (const elem of elementos) {
    total = elem.cant + total;
  }
  contando.innerHTML = `${total}`;
  contador.appendChild(contando);
}
// para mostrar el contador del carrito cuando se abre la página
$(document).ready(function () {
  contandoCarro();
});
// para recoger el menú que se despliega en el index
// $("#recoge").click(function (e) {
//     e.preventDefault();
//     tienda.removeChild(listado);
//     tienda.value = true;
// });
// $(document).ready(opciones);
$(document).ready(function () {
  todosLosProductos(renderProductos);
});

function renderProductos() {
  renderRemeras();
  renderStickers();
  renderTotes();
}

//#region  render methods
function renderRemeras() {
  let menu = "";
  const ejem = productoRemera.filter((producto) => producto.tipo == "remera");

  for (let producto of ejem) {
    menu += `<div class='card' style='width: 18rem;'>
                         <img src='${producto.img}' class='card-img-top'>
                         <div class='card-body'>
                         <h5 class='card-title'>${producto.nombre}</h5>
                         <p class='card-text'>$ ${producto.precio}</p>
                         <button class='btn botonComprar' id='${producto.serial}'><img id='${producto.serial}' src='img/carrito.png'></button>
                         </div>
                         </div>`;
  }

  listadoRemeras.classList.add("seccionDeTienda--flexible");
  listadoRemeras.innerHTML = menu;
  contenedorRemeras.appendChild(listadoRemeras);
  let botonesCarrito = document.getElementsByClassName("botonComprar");
  for (const botonC of botonesCarrito) {
    botonC.addEventListener("click", seleccionarProducto);
    botonC.addEventListener("click", contandoCarro);
  }
}

function renderStickers() {
  let menu = "";
  const ejem = productoRemera.filter((producto) => producto.tipo == "sticker");

  for (let producto of ejem) {
    menu += `<div class='card' style='width: 18rem;'>
                             <img src='${producto.img}' class='card-img-top'>
                             <div class='card-body'>
                             <h5 class='card-title'>${producto.nombre}</h5>
                             <p class='card-text'>$ ${producto.precio}</p>
                             <button class='btn botonComprar' id='${producto.serial}'><img id='${producto.serial}' src='img/carrito.png'></button>
                             </div>
                             </div>`;
  }

  listadoStickers.classList.add("seccionDeTienda--flexible");
  listadoStickers.innerHTML = menu;
  contenedorStickers.appendChild(listadoStickers);

  let botonesCarrito = document.getElementsByClassName("botonComprar");
  for (const botonC of botonesCarrito) {
    botonC.addEventListener("click", seleccionarProducto);
    botonC.addEventListener("click", contandoCarro);
  }
}

// hacer esto con los demas
function renderTotes() {
  const totes = productoRemera.filter((producto) => producto.tipo == "tote");
  renderCard(totes, contenedorTotes, listadoTotes);
}

//#endregion

function renderCard(elementos, contenedor, listado) {
  let menu = "";
  for (let producto of elementos) {
    menu += `<div class='card' style='width: 18rem;'>
                               <img src='${producto.img}' class='card-img-top'>
                               <div class='card-body'>
                               <h5 class='card-title'>${producto.nombre}</h5>
                               <p class='card-text'>$ ${producto.precio}</p>
                               <button class='btn botonComprar' id='${producto.serial}'><img id='${producto.serial}' src='img/carrito.png'></button>
                               </div>
                               </div>`;
  }

  listado.classList.add("seccionDeTienda--flexible");
  listado.innerHTML = menu;
  contenedor.appendChild(listado);
  let botonesCarrito = document.getElementsByClassName("botonComprar");
  for (const botonC of botonesCarrito) {
    botonC.addEventListener("click", seleccionarProducto);
    botonC.addEventListener("click", contandoCarro);
  }
}

$("#remera").click(() => {
  $("#seleccionProductos").toggle("fast");
});
$("#sticker").click(() => {
  $("#seccionStickers").toggle("fast");
});
$("#tote").click(() => {
  $("#seccionToteBag").toggle("fast");
});
