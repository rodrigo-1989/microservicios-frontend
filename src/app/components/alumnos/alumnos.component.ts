import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

   titulo ='°_° Listado de alumnos °_°';
   alumnos: Alumno[] = [];

  constructor(private service: AlumnoService) { }

  ngOnInit(): void {
    this.service.listar().subscribe( alumnos =>this.alumnos = alumnos);
  }

  public eliminar(alumno:Alumno): void{
    Swal.fire({
      title: 'Cuidado *_*',
      text: `Seguro que desea eliminar a ${alumno.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(alumno.id).subscribe(()=>{
          this.alumnos = this.alumnos.filter ( a=>a !== alumno);
        });
        Swal.fire(
          'Borrado!',
          `${alumno.nombre} a sido eliminad@!`,
          'success'
        )
      }
    });
  }

}
