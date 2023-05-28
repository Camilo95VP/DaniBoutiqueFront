import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito: any[] = [];
  private carritoSubject = new BehaviorSubject<any[]>(this.carrito);

constructor() { }

obtenerCarrito(): Observable<any[]> {
  return this.carritoSubject.asObservable();
}

agregarProducto(producto: any, cantidad: number = 1) {
  const productoExistente = this.carrito.find(item => item.id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad += cantidad;
  } else {
    producto.cantidad = cantidad;
    this.carrito.push(producto);
  }

  this.carritoSubject.next(this.carrito);
}

vaciarCarrito() {
  this.carrito = [];
  this.carritoSubject.next(this.carrito);
}

actualizarCarrito(carrito: any[]) {
  this.carritoSubject.next(carrito);
}


}
