import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from '../../models/alumno';
import { AlumnoService } from '../../services/alumno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css']
})
export class AlumnosFormComponent implements OnInit {

  titulo="Crear alumnos";
  alumno: Alumno =new Alumno();
  error:any;

  constructor(
      private service: AlumnoService,
      private router: Router,
      private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params =>{
      const id: number = +params.get('id');
      if(id){
          this.service.ver(id).subscribe( alumno=> this.alumno = alumno)
      }
    });
  }

  public crear():void{
    this.service.crear(this.alumno).subscribe( alumno=>{
      Swal.fire({
        icon: 'success',
        title: `Alumno ${alumno.nombre} creado con exito!`,
        showConfirmButton: true,
        timer: 15000
      })
      this.router.navigate(['/alumnos'])
    },err=>{
      if(  err.status === 400){
        this.error = err.error;
        console.log(this.error);
      }
    }
    );
  }
  public editar():void{
    this.service.editar(this.alumno).subscribe( alumno=>{
      Swal.fire({
        icon: 'success',
        title: `${alumno.nombre} actualizado con exito!`,
        showConfirmButton: true,
        timer: 15000
      })
      this.router.navigate(['/alumnos'])
    },err=>{
      if(  err.status === 400){
        this.error = err.error;
        console.log(this.error);
      }
    }
    );
  }

}
