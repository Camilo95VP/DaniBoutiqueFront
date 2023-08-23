import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../apiService.service';
import Swal from 'sweetalert2';
import { Producto } from '../bolsos/producto.interface';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css', 'admin.component.style.css']
})
export class AdminComponent implements OnInit {
  productos: any[] = [];
  isLoading: boolean = true;
  productoEnEdicion: any = null;
  productoEnEdicionId: string | null = null;
  filtroReferencia: string = '';
  mostrarSpinner: boolean = false;
  productosOrdenados: any[] = [];

  nuevoProducto: any = {
    nombre: '',
    precio: '',
    color: [],
    imagen: File // Cambiar a null para permitir la carga de imágenes
  };

  mostrarFormularioAgregarFlag: boolean = false;

  mostrarFormularioAgregar() {
    this.mostrarFormularioAgregarFlag = true;
    this.nuevoProducto = {
      nombre: '',
      precio: '',
      color: '',
      imagen: ''
    };
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiServiceService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.obtenerProductos();
  }

  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  loginError: boolean = false; // Agregar esta variable

  login() {
    // Simular autenticación (reemplaza esto con una lógica real)
    if (this.username === 'Dani' && this.password === 'Dani*03') {
      this.isLoggedIn = true;
      this.loginError = false; // Reiniciar el estado de error
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false; // Cambia el estado de carga a false después de un tiempo de espera (simulación)
      }, 1000); // Simula 2 segundos de carga
    } else {
      this.isLoggedIn = false;
      this.loginError = true; // Usuario o contraseña incorrectos
      this.clearLoginError();
    }
  }
  
  
  ordenarProductosPorNombre(productos: any[]): any[] {
    const productosPorNombre: { [nombre: string]: any[] } = {};  
    productos.forEach(producto => {
      const nombre = producto.nombre;
      if (!productosPorNombre[nombre]) {
        productosPorNombre[nombre] = [];
      }
      productosPorNombre[nombre].push(producto);
    });
  
    const productosOrdenados = [];
  
    for (const nombre in productosPorNombre) {
      if (productosPorNombre.hasOwnProperty(nombre)) {
        const productosConMismoNombre = productosPorNombre[nombre];
        productosOrdenados.push(...productosConMismoNombre);
      }
    }
  
    return productosOrdenados;
  }
  clearLoginError() {
    setTimeout(() => {
      this.loginError = false;
    }, 1000); // 5000 milisegundos (5 segundos)
  }

  logout() {
    this.isLoggedIn = false;
    this.loginError = false; // También reiniciar el estado de error al cerrar sesión
    this.username = '';
    this.password = '';
    this.router.navigate(['/'])
  }

  obtenerProductos(): void {
    this.apiService.getProducts().subscribe((productos) => {
      this.productos = productos;
      this.productosOrdenados = this.ordenarProductosPorNombre(this.productos)
      this.isLoading = false;
    });
  }


  editarProducto(producto: any) {
    this.productoEnEdicionId = producto._id;
    this.productoEnEdicion = { ...producto };
    this.cdr.detectChanges(); // Detectar cambios
    console.log(producto)
  }

  eliminarProducto(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el producto de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamada HTTP para eliminar el producto por ID
        this.apiService.eliminarProducto(id).subscribe(
          () => {
            Swal.fire(
              '¡Eliminado!',
              'El producto ha sido eliminado.',
              'success'
            );
            // Volver a cargar los productos desde la API después de eliminar
            this.obtenerProductos();
          },
          (error) => {
            console.error('Error al eliminar el producto:', error);
            Swal.fire(
              'Error',
              'No se pudo eliminar el producto.',
              'error'
            );
          }
        );
      }
    })
  };

  crearProducto() {
    this.mostrarSpinner = true;
    // Divide el campo color en un array de strings
    this.nuevoProducto.color = this.nuevoProducto.color.split(',');

    // Crear un objeto FormData para enviar datos con archivos
    const formData = new FormData();
    formData.append('nombre', this.nuevoProducto.nombre);
    formData.append('precio', this.nuevoProducto.precio);
    formData.append('color', this.nuevoProducto.color);
    formData.append('imagen', this.nuevoProducto.imagen); // Aquí asignamos el archivo de imagen

    this.apiService.crearProducto(formData)
      .subscribe(
        (productoCreado) => {
          Swal.fire('¡Producto creado!', 'El producto se ha creado exitosamente.', 'success');
          this.obtenerProductos(); // Actualizar la lista de productos
          this.mostrarFormularioAgregarFlag = false; // Ocultar el formulario
          this.nuevoProducto = { // Restaurar el objeto nuevoProducto
            nombre: '',
            precio: '',
            color: '',
            imagen: File
          };
          this.mostrarSpinner = false;
        },

        (error) => {
          console.error('Error al crear el producto:', error);
          console.log('Respuesta del servidor:', error.error); // Agregar esta línea
          Swal.fire('Error', 'Hubo un error al crear el producto.', 'error');
          this.mostrarSpinner = false;
        }
      );
  }


  guardarEdicion() {
    if (this.productoEnEdicion) {
      this.apiService.actualizarProducto(this.productoEnEdicion)
        .subscribe(
          (productoActualizado) => {
            // Aquí puedes realizar cualquier acción adicional después de actualizar el producto
            this.obtenerProductos()
            this.productoEnEdicionId = null; // Ocultar el formulario de edición
          },
          (error) => {
            console.error('Error al actualizar el producto:', error);
            // Aquí puedes manejar el error de alguna manera
          }
        );
    }
    this.productoEnEdicionId = null;
  }
  onFileChange(event: any) {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
    this.nuevoProducto.imagen = file; // Asignar el archivo al campo de imagen
  }

  // ... 


  cancelarEdicion() {
    // Limpiar la edición
    this.productoEnEdicionId = null;
  }

  cancelarAgregar() {
    this.mostrarFormularioAgregarFlag = false;
  }

  cumpleCriterios(producto: Producto): boolean {
    const referencia = this.filtroReferencia.toLowerCase().trim();


    if (referencia.length >= 2 && !producto.nombre.toLowerCase().includes(referencia)) {
      return false;
    }


    return true;
  }


}
