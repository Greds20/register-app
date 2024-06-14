import { Routes } from '@angular/router';

import {HomeComponent} from './pages/home/home.component';
import { AddComponent } from './pages/add/add.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'agregar',
        component: AddComponent
    },
    {
        path: 'agregar/:id',
        component: AddComponent
    }
];
