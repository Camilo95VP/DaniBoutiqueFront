import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../servicios/carrito_service/carrito.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css']
})
export class NavBarComponent implements OnInit {

  selectedCategory: string = '';
  isMenuOpen: boolean = false;
  cantidadProductos: Observable<String> | undefined;
  
  
  constructor(
    private router: Router,
    private carritoService: CarritoService) { }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  ngOnInit() {
    this.cantidadProductos = this.carritoService.obtenerCarrito().pipe(
      map((carrito: any[]) => carrito.length.toString()))
  }

  navigateToCategory() {
   
      if (this.selectedCategory === 'bolsos') {
        this.router.navigate(['/bolsos']);
        this.closeMenu(); // Cierra el menú
      }

      if (this.selectedCategory === 'tennis') {
        this.router.navigate(['/tennis']);
        this.closeMenu(); // Cierra el menú
      }
  }

  redirigirACarrito() {
    this.router.navigate(['/carrito']); 
  }

}
