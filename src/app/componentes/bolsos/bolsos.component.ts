import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../servicios/carrito_service/carrito.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PRODUCTOS } from '../bolsos/productos.data';
import { Producto } from '../bolsos/producto.interface';
import { ApiServiceService } from '../apiService.service';



@Component({
  selector: 'app-bolsos',
  templateUrl: './bolsos.component.html',
  styleUrls: ['./bolsos.component.css']
})
export class BolsosComponent implements OnInit {

  isLoading: boolean = true;

  mostrarCarritoModal: boolean = false;
  mostrarImagenGrande: boolean = false;
  imagenGrandeUrl: string = '';
  imagenSeleccionada: any = null;
  colorSeleccionado: string | null = null;
  filtroReferencia: string = '';
  filtroColor: string = '';
  productos: Producto[] = PRODUCTOS;
  noResults: boolean = false;

  mostrarImagenGrandee(url: string) {
     // Simula un retraso para mostrar el spinner de carga
    this.imagenGrandeUrl = url;
    this.mostrarImagenGrande = true;
  }

  cerrarModal() {
    this.mostrarImagenGrande = false;
  }

  constructor(
    private carritoService: CarritoService,
    private router: Router,
    private apiService: ApiServiceService
    ) { }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false; // Indica que el contenido ha terminado de cargar
    }, 1000); // Cambia esto al tiempo que consideres adecuado
    // Obtener productos desde la base de datos usando el servicio
  this.apiService.getProducts().subscribe((productos) => {
    this.productos = productos;
    console.log(productos);
  });
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
    Swal.fire({
      title: 'Producto agregado con éxito al carrito',
      icon: 'success',
      showConfirmButton: false,
      timer: 2500
    });
    let colorSeleccionado: string | null = null;
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
        confirmButtonText: 'Ok',
        inputValidator: (value) => {
          return this.validarColorSeleccionado(value);
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const colorSeleccionado = result.value;
          this.carritoService.agregarProducto({ ...producto, color: colorSeleccionado });
          this.mostrarCarritoModal = true;
          this.router.navigate(['carrito']);
          if (colorSeleccionado.length>=0) {
            Swal.fire({
              title: 'Producto agregado con éxito al carrito',
              icon: 'success',
              showConfirmButton: false,
              timer: 2500
            });
          }
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

  cumpleCriterios(producto: Producto): boolean {
    const referencia = this.filtroReferencia.toLowerCase().trim();
    const color = this.filtroColor.toLowerCase().trim();
  
    if (referencia.length >= 2 && !producto.nombre.toLowerCase().includes(referencia)) {
      return false;
    }
  
    if (color.length >= 2 && !producto.color.some(c => c.toLowerCase().includes(color))) {
      return false;
    }
  
    return true;
  }
  
}
