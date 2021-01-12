import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { AlumnosFormComponent } from './components/alumnos/alumnos-form.component';
import { CursoFormComponent } from './components/cursos/curso-form.component';
import { ExamenFormComponent } from './components/examenes/examen-form.component';
import { AsignarAlumnosComponent } from './components/cursos/asignar-alumnos.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'cursos'},
  {path:'alumnos',component:AlumnosComponent},
  {path:'alumnos/form',component:AlumnosFormComponent},
  {path:'alumnos/form/:id',component:AlumnosFormComponent},
  {path:'cursos',component:CursosComponent},
  {path:'cursos/form',component:CursoFormComponent},
  {path:'cursos/form/:id',component:CursoFormComponent},
  {path:'examenes',component:ExamenesComponent},
  {path:'examenes/form',component:ExamenFormComponent},
  {path:'examenes/form/:id',component:ExamenFormComponent},
  {path:'cursos/asignar-alumnos/:id',component:AsignarAlumnosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
