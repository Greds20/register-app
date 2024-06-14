import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
//Importar API
import { DesarrolladorService } from '../../domains/shared/services/desarrollador.service';
//Modelo de la tabla Desarrollador de la base de datos
import { desarrollador } from '../../models/desarrollador.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterModule, RouterOutlet, CommonModule ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})

export class AddComponent {
  //Declara para el uso de la API
  private desarrolladorService = inject(DesarrolladorService);
  //Declara un arreglo de objetos tipo Desarrollador
  desarrolladores = signal<desarrollador[]>([]);              //Mejora el rendimiento al llamar variables con Signal
  form!: FormGroup;     //Guarda los campos del formulario en un arreglo
  id!: string;          //Guarda parametro de la URL en caso de editar
  isAddMode!: boolean;  //Guarda si está en en "modo" editar o guardar
  submitted = false;    //Cambia si el usuario envía el formulario

  constructor(
    private formBuilder: FormBuilder,   //Necesario para validaciones y arreglo de campos
    private route: ActivatedRoute,      //Necesario para obtención del parametro
    private router: Router              //Necesario para la redirección
  ) {}

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];     //Guarda el parametro de la URL
    this.isAddMode = !this.id;                      //Cambia según si existe un parametro

    //Guarda los campos del formulario en el arreglo y aplica validaciones
    this.form = this.formBuilder.group({
      nickname: ['', [Validators.maxLength(35), this.isAddMode ? Validators.required : Validators.nullValidator]],
      nombres: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/), Validators.maxLength(35)]], //Segundo validador: acepta solo letras con o sin tilde
      apellidos: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/), Validators.maxLength(35)]]
    });

    //Comprueba si está "modo" edición
    if(!this.isAddMode){
      this.form.controls.nickname.disable();    //Se deshabilita nickname en "modo" edición de nickname
      this.getDesarrollador(this.id);           //Envia variable con parametro a la función
    }
  }

  //Facilita el acceso a los campos de formulario que se encuentran en el arreglo
  get f() {
    return this.form.controls;
  }

  //Trae un registro especifico con la variable pasada
  getDesarrollador(id: string) : void{
    this.desarrolladorService.getSelecDesarrollador(id)     //Envía la variable a la API
    .subscribe({
      next: (desarrolladores) => {                        //Repasa los registros traidos por la API y los trae
        this.desarrolladores.set(desarrolladores);        //Se guarda en el arreglo desarrolladores
        this.form.patchValue(desarrolladores[0]);         //Cambia los valores de los campos en el formulario los registro de la base de datos
      },
      error: () => {
        console.error("Error al obtener los datos");
      }
    });
  }

  //Agrega nuevos registro a la base de datos
  insertDesarrollador(): void {
    //Envía los valores de los campos al API
    this.desarrolladorService.insertDesarrollador((this.form.value).nickname, (this.form.value).nombres, (this.form.value).apellidos)
    .subscribe({
      next: (desarrolladores) => {
        console.log('Registro completado');
      },
      error: () => {

      }
    });
  }

  //Actualiza los registro de la base de datos
  updateDesarrollador(): void {
    //Envía los valores de los campos al API
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

  //Metodo al enviar formulario
  onSubmit() {
    this.submitted = true;          //Cambia si el usuario envió el formulario
    // Retorna si tiene campos invalidos
    if (this.form.invalid) {
      return;
    }
    
    //Según la variable "isAddMode" comprueba si se creará nuevos registro o se editarán
    if (this.isAddMode) {
      this.insertDesarrollador();
      this.router.navigate(['../'], { relativeTo:this.route });     //Redirección a pagina principal
    } else {
      this.updateDesarrollador();
      this.router.navigate(['../../'], { relativeTo:this.route });
    }
  }
}
