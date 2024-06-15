import { Injectable, inject } from '@angular/core';
import { desarrollador } from './../../../models/desarrollador.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class DesarrolladorService {
  private http = inject(HttpClient);

  //Método traer registros
  getDesarrollador(){
    return this.http.get<desarrollador[]>('/devs');
  }

  //Método insertar registro
  insertDesarrollador(nickname: string, nombres: string, apellidos: string,){
    return this.http.post<desarrollador[]>('/devs', { nickname, nombres, apellidos });
  }

  //Método actualización registro
  updateDesarrollador(nombres: string, apellidos: string, id: string){
    return this.http.put<desarrollador[]>('/devs/'+id, { nombres, apellidos });
  }

  //Método traer registro específico
  getSelecDesarrollador(id: string){
    return this.http.get<desarrollador[]>('/devs/'+id);
  }

  //Método eliminar registro
  deleteDesarrollador(id: number){
    return this.http.delete<desarrollador[]>('/devs/'+id);
  }
}
