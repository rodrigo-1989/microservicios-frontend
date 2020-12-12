import { Component, OnInit, ViewChild } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno';
import Swal from 'sweetalert2';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

   titulo ='°_° Listado de alumnos °_°';
   alumnos: Alumno[] = [];
   totalRegistros = 0;
   paginaActual = 0;
   totalPorPagina = 4;
   @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private service: AlumnoService) { }

  ngOnInit(): void {
    this.calcularRangos();
  }

  paginar(event: PageEvent):void {
      this.paginaActual = event.pageIndex;
      this.totalPorPagina = event.pageSize;
      this.calcularRangos();
  }

  private calcularRangos(){
    this.service.listarPaginas(this.paginaActual.toString(),this.totalPorPagina.toString())
      .subscribe( p =>{
        this.alumnos = p.content as Alumno[];
        this.totalRegistros = p.totalElements as number;
        this.paginator._intl.itemsPerPageLabel = 'Registros por pagina: '
      });
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
          this.calcularRangos();
          //this.alumnos = this.alumnos.filter ( a=>a !== alumno);
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
