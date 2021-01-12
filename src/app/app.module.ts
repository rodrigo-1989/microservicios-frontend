import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }     from './app.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { CursosComponent }  from './components/cursos/cursos.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { LayoutModule } from './layout/layout.module';
import { AlumnosFormComponent } from './components/alumnos/alumnos-form.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CursoFormComponent } from './components/cursos/curso-form.component';
import { ExamenFormComponent } from './components/examenes/examen-form.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { AsignarAlumnosComponent } from './components/cursos/asignar-alumnos.component';

@NgModule({
  declarations: [
    AppComponent,
    AlumnosComponent,
    CursosComponent,
    ExamenesComponent,
    AlumnosFormComponent,
    CursoFormComponent,
    ExamenFormComponent,
    AsignarAlumnosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
