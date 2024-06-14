import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { DesarrolladorService } from '../../domains/shared/services/desarrollador.service';
import { desarrollador } from '../../models/desarrollador.model';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterModule, RouterOutlet, CommonModule ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})

export class AddComponent {
  private desarrolladorService = inject(DesarrolladorService);
  desarrolladores = signal<desarrollador[]>([]);
  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      nickname: ['', [Validators.maxLength(35), this.isAddMode ? Validators.required : Validators.nullValidator]],
      nombres: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/), Validators.maxLength(35)]],
      apellidos: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/), Validators.maxLength(35)]]
    });

    if(!this.isAddMode){
      this.form.controls.nickname.disable();
      this.getDesarrollador(this.id);
    }
  }

  //Facilitar el acceso a los campos de formulario
  get f() {
    return this.form.controls;
  }

  getDesarrollador(id: string) : void{
    this.desarrolladorService.getSelecDesarrollador(id)
    .subscribe({
      next: (desarrolladores) => {
        this.desarrolladores.set(desarrolladores);
        this.form.patchValue(desarrolladores[0]);
        console.log(desarrolladores[0]);
      },
      error: () => {
        console.error("Error al obtener los datos");
      }
    });
  }

  insertDesarrollador(): void {
    this.desarrolladorService.insertDesarrollador((this.form.value).nickname, (this.form.value).nombres, (this.form.value).apellidos)
    .subscribe({
      next: (desarrolladores) => {
        console.log('Registro completado');
      },
      error: () => {

      }
    });
  }

  updateDesarrollador(): void {
    this.desarrolladorService.updateDesarrollador(this.form.value.nombres, this.form.value.apellidos, this.id)
    .subscribe({
      next: (desarrolladores) => {
        console.log('Actualización completada');
      },
      error: () => {
        console.log('Error al Actualizar');
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    // Retorna si tiene campos invalidos
    if (this.form.invalid) {
      return;
    }
    
    this.loading = true;
    if (this.isAddMode) {
      this.insertDesarrollador();
      this.router.navigate(['../'], { relativeTo:this.route });
    } else {
      this.updateDesarrollador();
      this.router.navigate(['../../'], { relativeTo:this.route });
    }
  }
}
