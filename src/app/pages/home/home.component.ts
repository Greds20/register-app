import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet, ActivatedRoute } from '@angular/router';
//Modelo de la tabla Desarrollador de la base de datos
import { desarrollador } from './../../models/desarrollador.model';
//Importar API
import { DesarrolladorService } from '../../domains/shared/services/desarrollador.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  //Declara para el uso de la API
  private desarrolladorService = inject(DesarrolladorService);
  //Declara un arreglo de objetos tipo Desarrollador
  desarrolladores = signal<desarrollador[]>([]);        //Mejora el rendimiento al llamar variables con Signal

  ngOnInit(){
    this.getDesarrolladores();
  }

  //Obtiene lo registros de la tabla desarrollador 
  getDesarrolladores(): void {
    //Llama la API y los guarda los registro en el arreglo
    this.desarrolladorService.getDesarrollador()
    .subscribe({
      next: (desarrolladores) => {                        //Repasa los registros traidos por la API y los trae
        this.desarrolladores.set(desarrolladores);        //Se guarda en el arreglo desarrolladores
      },
      error: () => {
        console.error("Error al obtener los datos");
      }
    });
  }

  //Elimina un registro de la tabla desarrollador por medio del Front End
  eliminarDesarrollador(id: number): void {
    //Envía un registro la API
    this.desarrolladorService.deleteDesarrollador(id)
    .subscribe({
      error: () => {
        console.error("Error al obtener los datos");
      }
    });
    //Elimina por filtrado el registro
    this.desarrolladores.update((devs) => devs.filter((devs) => devs.id_desarrollador !== id));
  }
}
