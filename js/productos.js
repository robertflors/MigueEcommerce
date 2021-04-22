
class Producto {
    constructor(nombre, serial, precio, img, tipo) {
      this.nombre = nombre;
      this.serial = serial;
      this.precio = precio;
      this.img = img;
      this.tipo = tipo;
      this.cant = 1;
    }
  }

  // función para cargar, desde unos JSON estáticos, las diferentes categorías de productos disponibles
function todosLosProductos(then) {
    $.getJSON("./productos/productos.json", function (productos) {
      for (const producto of productos) {
        tienda.push(new Producto(producto.nombre, producto.serial,producto.precio,producto.img,producto.tipo));
      }
      then();
    });
  }

  function renderProductos() {
    renderRemeras();
    renderStickers();
    renderTotes();
  }

  //#región render, se utiliza un filter en el array principal para poder generar la sección correspondiente
function renderRemeras() {
  const ejem = tienda.filter((producto) => producto.tipo == "remera");
  renderCard(ejem, contenedorRemeras, listadoRemeras);  
}

function renderStickers() {
  const ejem = tienda.filter((producto) => producto.tipo == "sticker");
  renderCard(ejem, contenedorStickers, listadoStickers);
}

function renderTotes() {
  const totes = tienda.filter((producto) => producto.tipo == "tote");
  renderCard(totes, contenedorTotes, listadoTotes);
}
//#fin de región

// función que se emplea en la renderización de los diferentes tipos de productos
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
