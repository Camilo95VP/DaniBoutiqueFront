import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../servicios/carrito_service/carrito.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PRODUCTOS } from '../bolsos/productos.data';
import { Producto } from '../bolsos/producto.interface';



@Component({
  selector: 'app-bolsos',
  templateUrl: './bolsos.component.html',
  styleUrls: ['./bolsos.component.css']
})
export class BolsosComponent implements OnInit {

  mostrarCarritoModal: boolean = false;
  mostrarImagenGrande: boolean = false;
  imagenGrandeUrl: string = '';
  imagenSeleccionada: any = null;
  colorSeleccionado: string | null = null;

  productos: Producto[] = PRODUCTOS;

  mostrarImagenGrandee(url: string) {
    this.imagenGrandeUrl = url;
    this.mostrarImagenGrande = true;
  }

  cerrarModal() {
    this.mostrarImagenGrande = false;
  }

  constructor(
    private carritoService: CarritoService,
    private router: Router) { }

  ngOnInit() {
  }

  generarOpcionesColores(colores: string[]): { [key: string]: string } {
    const opciones: { [key: string]: string } = {};
  
    // Recorrer el array de colores y agregar solo los colores no duplicados
    for (const color of colores) {
      if (!opciones[color]) {
        opciones[color] = color;
      }
    }
  
    return opciones;
  }
  
  agregarAlCarrito(producto: any) {
    if (producto.color && producto.color.length > 1) {
      Swal.fire({
        title: 'Colores disponibles',
        text: 'Escoge el color que deseas:',
        confirmButtonColor: 'green',
        background: '#dadadaeb',
        color: 'black',
        input: 'select',
        inputOptions: this.generarOpcionesColores(producto.color),
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Agregar al carrito',
        inputValidator: (value) => {
          return this.validarColorSeleccionado(value);
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const colorSeleccionado = result.value;
          this.carritoService.agregarProducto({ ...producto, color: colorSeleccionado });
          this.mostrarCarritoModal = true;
          this.router.navigate(['carrito']);
        }
      });
    } else {
      this.carritoService.agregarProducto(producto);
      this.mostrarCarritoModal = true;
      this.router.navigate(['carrito']);
    }
  }
  
  

validarColorSeleccionado(value: string): Promise<string | null> {
  return new Promise<string | null>((resolve) => {
    if (!value) {
      resolve('Debes seleccionar un color');
    } else {
      resolve(null);
    }
  });
}

}
