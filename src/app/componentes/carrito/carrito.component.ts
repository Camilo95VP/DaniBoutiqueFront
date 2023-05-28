import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../servicios/carrito_service/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carrito: {
imagen: any;
    nombre: any;
    cantidad: any;
    precio: any; producto: any, color: string 
}[] = [];
  mostrarCarritoModal: boolean = false;
  detallesProductos: String | undefined
  mensaje: String = ''
  colorSeleccionado: string | null = null;


  constructor(
    private carritoService: CarritoService,
    private router: Router) {
    this.carritoService.obtenerCarrito().subscribe((carrito: any[]) => {
      this.carrito = carrito;
    });
  }

  ngOnInit() {
  }

  calcularTotal(): number {
    let total = 0;
    for (const producto of this.carrito) {
      const precio = parseFloat(producto.precio.replace("$ ", "").replace(".", "").replace(",", "."));
      const cantidad = producto.cantidad;
      const subtotal = precio * cantidad;
      total += subtotal;
    }
    return total;
  }
  

  enviarPedido() {
    const pedido = {
      productos: this.carrito,
      total: this.calcularTotal()
    }
    this.detallesProductos = this.carrito.map((producto) => {
      return `Bolso: ${producto.nombre}, Cantidad: ${producto.cantidad}, Color: ${producto.color}, Precio: ${producto.precio}`;
    }).join('\n');
    console.log(this.detallesProductos)
    this.mensaje = `¡Hola! Quiero realizar el siguiente pedido:\n\n${this.detallesProductos}\n\nTotal: ${this.calcularTotal()}\n\n Muchas gracias !`;
    const numeroTelefono = '3145570996';
    const enlaceWhatsApp = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(String(this.mensaje))}`;
    window.open(enlaceWhatsApp, '_blank');
    this.carritoService.vaciarCarrito();
    console.log(this.mensaje)
  }


  vaciarCarrito() {
    this.carritoService.vaciarCarrito();
  }

  eliminarProducto(producto: any) {
    const index = this.carrito.indexOf(producto);
    if (index !== -1) {
      this.carrito.splice(index, 1);
      this.carritoService.actualizarCarrito(this.carrito);
    }
  }
  

  aumentarCantidad(producto: any) {

    this.carritoService.agregarProducto(producto, 1);
  }

  disminuirCantidad(producto: any) {
    if (producto.cantidad > 1) {
      this.carritoService.agregarProducto(producto, -1);
    }
  }

  cerrarCarritoModal() {
    this.mostrarCarritoModal = false; // Ocultar el modal del carrito
  }

  redirigirATienda() {
    this.router.navigate(["/"])
  }

  redirigirABolsos() {
    this.router.navigate(["/bolsos"])
  }

}
