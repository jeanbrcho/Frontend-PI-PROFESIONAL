import { Routes } from '@angular/router';
import {ProfesionalesComponent} from './components/profesionales/profesionales.component';
import {PlanesComponent} from './components/planes/planes.component';
import {LoginComponent} from './components/login/login.component';
import {PanelComponent} from './components/panel/panel.component';
import {RegistroComponent} from './components/registro/registro.component';
import {PanelTurnosComponent} from './components/panel/panel-turnos/panel-turnos.component';
import {PanelServiciosComponent} from './components/panel/panel-servicios/panel-servicios.component';
import {PanelPerfilComponent} from './components/panel/panel-perfil/panel-perfil.component';


export const routes: Routes = [
    {path: '', component: ProfesionalesComponent },
    {path: 'planes', component: PlanesComponent },
    {path: 'login', component: LoginComponent },
    {path: 'panel', component: PanelComponent, 
        children: [
    
    { path: '', redirectTo: 'perfil', pathMatch: 'full' }, 
    { path: 'turnos', component: PanelTurnosComponent },
    { path: 'servicios', component: PanelServiciosComponent }, 
    { path: 'perfil', component: PanelPerfilComponent }, 
  ]
    },
    {path: 'registro', component: RegistroComponent}
    
];
