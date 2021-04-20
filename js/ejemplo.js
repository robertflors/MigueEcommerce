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