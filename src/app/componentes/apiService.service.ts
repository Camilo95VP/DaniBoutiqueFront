import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  // https://daniback.onrender.com
  // http://localhost:4000

  private apiUrl = 'https://daniback.onrender.com/api/bolsos'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
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

  cargarImagen(imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append('imagen', imagen); // 'imagen' debe coincidir con el nombre del campo en tu servidor

    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

}
