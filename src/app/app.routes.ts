import { Routes } from '@angular/router';
import {ProfesionalesComponent} from './components/profesionales/profesionales.component';
import {PlanesComponent} from './components/planes/planes.component';
import {LoginComponent} from './components/login/login.component';
import {PanelComponent} from './components/panel/panel.component';

export const routes: Routes = [
    {path: '', component: ProfesionalesComponent },
    {path: 'planes', component: PlanesComponent },
    {path: 'login', component: LoginComponent },
    {path: 'panel', component: PanelComponent}
    
];
