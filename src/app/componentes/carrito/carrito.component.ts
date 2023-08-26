import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../servicios/carrito_service/carrito.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carritoAbierto: boolean = false;

  carrito: {
imagen: any;
    nombre: any;
    cantidad: any;
    precio: any; 
    producto: any, 
    color: string 
} [] = [];
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
    const precioNumerico = parseFloat(producto.precio.replace(/[^0-9.]/g, ''));
    if (!isNaN(precioNumerico)) {
      const cantidad = producto.cantidad;
      const subtotal = precioNumerico * cantidad;
      total += subtotal;
    }
  }
  return total;
  }
  

  enviarPedido() {
    this.detallesProductos = this.carrito.map((producto) => {
      return `Bolso: ${producto.nombre}, Cantidad: ${producto.cantidad}, Color: ${producto.color}, Precio: ${producto.precio}\n`;
    }).join('');
  
    const detallesHTML = this.carrito.map((producto) => {
      return `
        <li>
          <img src="${producto.imagen}" alt="${producto.nombre}" width="100" height="100">
          Bolso: ${producto.nombre}, Cantidad: ${producto.cantidad}, Color: ${producto.color}, Precio: ${producto.precio}
        </li>
      `;
    }).join('');
  
    Swal.fire({
      title: 'Confirmar pedido',
      html: `
        <div>
          <p>Por favor, revisa los detalles del pedido:</p>
          <p><strong>Productos:</strong></p>
          <ul>
            ${detallesHTML}
          </ul>
          <p><strong>Total:</strong> ${this.calcularTotal()}</p>
        </div>`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'swal2-confirm',
        cancelButton: 'swal2-cancel'
      },
      background: '#ffffff'
    }).then((result) => {
      if (result.isConfirmed) {
        const mensaje = `¡Hola! Quiero realizar el siguiente pedido:\n\n${this.detallesProductos}\n\nTotal: ${this.calcularTotal()}\n\n¡Muchas gracias!`;
        const numeroTelefono = '3145570996';
        const enlaceWhatsApp = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(String(mensaje))}`;
        window.open(enlaceWhatsApp, '_blank');
        this.carritoService.vaciarCarrito();
        Swal.fire('Pedido enviado', 'El pedido se ha enviado correctamente, pronto te contactaremos por WhatsApp', 'success');
      }
    });
  }


  vaciarCarrito() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción vaciará el carrito. ¿Deseas continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Vaciar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.carritoService.vaciarCarrito();
        Swal.fire('Carrito vaciado', 'El carrito se ha vaciado correctamente', 'success');
      }
    });
  }

  eliminarProducto(producto: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el producto del carrito. ¿Deseas continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.carrito.indexOf(producto);
        if (index !== -1) {
          this.carrito.splice(index, 1);
          this.carritoService.actualizarCarrito(this.carrito);
        }
        Swal.fire('Producto eliminado', 'El producto se ha eliminado del carrito correctamente', 'success');
      }
    });
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

  cerrarCarrito() {
    this.carritoAbierto = false;
  }

}
