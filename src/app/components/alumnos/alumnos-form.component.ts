import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from '../../models/alumno';
import { AlumnoService } from '../../services/alumno.service';
import { CommonFormComponent } from '../common-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css'],
})
export class AlumnosFormComponent
  extends CommonFormComponent<Alumno, AlumnoService>
  implements OnInit {

    private fotoSeleccionada: File;

    constructor(service: AlumnoService, router: Router, route: ActivatedRoute) {
      super(service, router, route);
      this.titulo = 'Crear alumnos';
      this.model = new Alumno();
      this.redirect = '/alumnos';
      this.nombreModel = Alumno.name;
    }

  public seleccionarFoto( event ): void{
    this.fotoSeleccionada = event.target.files[0];

    if ( this.fotoSeleccionada.type.indexOf('image') < 0 ){
        this.fotoSeleccionada = null;
        Swal.fire('Error: al selecionar la foto',
                  'El archivo de de ser del tipo imagen',
                  'error');
    }
  }

  public crear():void{
    if(!this.fotoSeleccionada){
      super.crear();
    }else{
      this.service.crearConFoto(this.model,this.fotoSeleccionada).subscribe( alumno=>{
        Swal.fire({
          icon: 'success',
          title: `Alumno ${alumno.nombre} creado con exito!`,
          showConfirmButton: true,
          timer: 15000
        })
        this.router.navigate([this.redirect])
      },err=>{
        if(  err.status === 400){
          this.error = err.error;
        }
      }
      );
    }
  }
  public editar():void{
    if(!this.fotoSeleccionada){
      super.editar();
    }else{
      this.service.editarConFoto(this.model,this.fotoSeleccionada).subscribe( alumno=>{
        Swal.fire({
          icon: 'success',
          title: `Alumno ${alumno.nombre} actualizado con exito!`,
          showConfirmButton: true,
          timer: 15000
        })
        this.router.navigate([this.redirect])
      },err=>{
        if(  err.status === 400){
          this.error = err.error;
          console.log(this.error);
        }
      }
      );
    }
  }
}
