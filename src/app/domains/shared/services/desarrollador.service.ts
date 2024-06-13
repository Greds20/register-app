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
    return this.http.get<desarrollador[]>('/devs');
  }
}
