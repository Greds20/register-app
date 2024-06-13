import { Routes } from '@angular/router';

import {HomeComponent} from './pages/home/home.component';
import { EditComponent } from './pages/edit/edit.component';
import { AddComponent } from './pages/add/add.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'editar',
        component: EditComponent
    },
    {
        path: 'agregar',
        component: AddComponent
    }
];
