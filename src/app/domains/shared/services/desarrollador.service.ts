import { Injectable, inject, signal } from '@angular/core';
import { desarrollador } from './../../../models/desarrollador.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DesarrolladorService {
  private http = inject(HttpClient);
  
  constructor() { }

  getDesarrollador(){
    return this.http.get<desarrollador[]>('https://api.escuelajs.co/api/v1/products');
    /*
    return [
      {
      id_desarrollador: 1,
      nombres: 't',
      apellidos: 's',
      alias: 's',
      estado: true
      }
    ];
    */
  }
}
