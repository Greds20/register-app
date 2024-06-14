import { Injectable, Signal, inject, signal } from '@angular/core';
import { desarrollador } from './../../../models/desarrollador.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DesarrolladorService {
  desarrolladores = signal<desarrollador[]>([]);
  private http = inject(HttpClient);
  
  constructor() { }

  getDesarrollador(){
    return this.http.get<desarrollador[]>('/devs');
  }

  insertDesarrollador(nickname: string, nombres: string, apellidos: string,){
    return this.http.post<desarrollador[]>('/devs', { nickname, nombres, apellidos });
  }

  updateDesarrollador(nombres: string, apellidos: string, id: string){
    return this.http.put<desarrollador[]>('/devs/'+id, { nombres, apellidos });
  }

  getSelecDesarrollador(id: string){
    return this.http.get<desarrollador[]>('/devs/'+id);
  }

  deleteDesarrollador(id: number){
    return this.http.delete<desarrollador[]>('/devs/'+id);
  }
}
