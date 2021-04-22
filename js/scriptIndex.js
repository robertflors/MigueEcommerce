const tienda = [];
const productosElegidos = [];
// las variables que hacen referencia a las diferentes secciones de cada tipo de producto
let contenedorRemeras = document.getElementById("seccionRemeras");
let contenedorStickers = document.getElementById("seccionStickers");
let contenedorTotes = document.getElementById("seccionToteBag");
// variables que luego serán utilizadas para rellenarlas de forma dinámica con los diversos productos
let listadoRemeras = document.createElement("div");
let listadoStickers = document.createElement("div");
let listadoTotes = document.createElement("div");
// variables que se emplearán para llevar un contador de la cantidad de productos en el carrito
let contador = document.getElementById("contadorCarrito");
let contando = document.createElement("p");


// función llamada en los eventos de "botonCarrito" que crea el array de los productos elegidos al presionar el botón de comprar
function seleccionarProducto(e) {
  let productoElegido = tienda.find((obj) => obj.serial == e.target.id);
  productosElegidos.push(productoElegido);
  carroJSON(productoElegido);
}

// // función que agrega productos al array del localstorage
function carroJSON(dato) {
  //si el carrito de storage no existe crea el primer elemento
  if (!localStorage.getItem("carrito")) {
    let carritoJSON = JSON.stringify(productosElegidos);
    localStorage.setItem("carrito", carritoJSON);
  }
  //si ya hay un valor en el carrito le hace un push al array del storage
  else {
    const validarCarrito = JSON.parse(localStorage.getItem("carrito"));
    let buscarProducto = validarCarrito.find((obj) => obj.serial == dato.serial);
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
//Función que agrega un contador en el navbar a la hora de seleccionar productos en el menú
function contandoCarro() {
  let elementos = JSON.parse(localStorage.getItem("carrito"));
  let total = 0;
  for (const elem of elementos) {
    total += elem.cant;
  }
  contando.innerHTML = `${total}`;
  contador.appendChild(contando);
}
// para mostrar el contador del carrito cuando se abre la página
$(document).ready(function () {
  contandoCarro();
});
// para renderizar el listado de productos al abrir la página
$(document).ready(function () {
  todosLosProductos(renderProductos);
});

//región eventos: eventos para hacer el toggle a cada sección de la tienda
$("#remera").click(() => {
  $("#seccionRemeras").toggle("fast");
});
$("#sticker").click(() => {
  $("#seccionStickers").toggle("fast");
});
$("#tote").click(() => {
  $("#seccionToteBag").toggle("fast");
});
// fin de la región