import { Routes } from '@angular/router';
import {ProfesionalesComponent} from './components/profesionales/profesionales.component';
import {PlanesComponent} from './components/planes/planes.component';

export const routes: Routes = [
    {path: '', component: ProfesionalesComponent },
    {path: 'planes', component: PlanesComponent }
];
