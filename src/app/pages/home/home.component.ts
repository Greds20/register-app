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
  
  dev: any[] = [];

  ngOnInit(){
    this.getItems();
  }

  getItems(): void {
    this.desarrolladorService.getDesarrollador()
    .subscribe({
      next: (desarrolladores) => {
        console.log(desarrolladores);
        this.desarrolladores.set(desarrolladores);
      },
      error: () => {

      }
    });
  }

  eliminarDev(id: number){
    this.desarrolladores.update((desarrolladores) => 
      desarrolladores.filter((desarrolladores, position) => position !== id));
  }
}
