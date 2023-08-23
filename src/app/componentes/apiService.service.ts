import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  // https://daniback.onrender.com
  // http://localhost:4000

  private apiUrl = 'https://daniback.onrender.com/api/bolsos'; // Reemplaza con la URL de tu API
  private urlImagen = 'https://daniback.onrender.com'

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((productos) => {
        // Mapear la URL de la imagen para cada producto
        return productos.map((producto) => {
          return {
            ...producto,
            imagen: `${this.urlImagen}/uploads/${producto.imagen}` // Ruta relativa a las imágenes en el servidor
          };
        });
      })
    );
  }


  actualizarProducto(producto: any): Observable<any> {
    const url = `${this.apiUrl}/${producto._id}`;
    return this.http.put(url, producto);
  }

  eliminarProducto(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  crearProducto(producto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, producto);
  }


}
