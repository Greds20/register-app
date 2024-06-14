import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { desarrollador } from './../../models/desarrollador.model';
import { DesarrolladorService } from '../../domains/shared/services/desarrollador.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  private desarrolladorService = inject(DesarrolladorService);

  private http = inject(HttpClient);
  desarrolladores = signal<desarrollador[]>([]);

  ngOnInit(){
    this.getItems();
  }

  getItems(): void {
    this.desarrolladorService.getDesarrollador()
    .subscribe({
      next: (desarrolladores) => {
        this.desarrolladores.set(desarrolladores);
      },
      error: () => {
        console.error("Error al obtener los datos");
      }
    });
  }

  eliminarDesarrollador(id: number): void {
    this.desarrolladorService.deleteDesarrollador(id)
    .subscribe({
      error: () => {
        console.error("Error al obtener los datos");
      }
    });
    this.desarrolladores.update((devs) => devs.filter((devs) => devs.id_desarrollador !== id));
  }
}
