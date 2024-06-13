import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { desarrollador } from './../../models/desarrollador.model';
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

  desarrolladores = signal<desarrollador[]>([]);
  private desarrolladorService = inject(DesarrolladorService)

  ngOnInit(){
    this.desarrolladorService.getDesarrollador()
    .subscribe({
      next: (desarrolladores) => {
        this.desarrolladores.set(desarrolladores);
        console.log(desarrolladores);
      }
    })
  }

  

  eliminarDev(id: number){
    this.desarrolladores.update((desarrolladores) => 
      desarrolladores.filter((desarrolladores, position) => position !== id));
  }
}
