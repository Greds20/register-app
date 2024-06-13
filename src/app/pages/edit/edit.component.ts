import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  route = inject(ActivatedRoute);
  id = '';

  constructor(){
    this.route.params.subscribe((params) => {
      console.log(params['ID_DESARROLLADOR']);
    })
  }
}
