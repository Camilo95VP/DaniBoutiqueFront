import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private apiUrl = 'http://localhost:4000/api/bolsos'; // Reemplaza con la URL de tu API

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

}