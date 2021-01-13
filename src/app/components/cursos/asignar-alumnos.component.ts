import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from '../../models/curso';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../../services/curso.service';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from 'src/app/models/alumno';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-asignar-alumnos',
  templateUrl: './asignar-alumnos.component.html',
  styleUrls: ['./asignar-alumnos.component.css']
})
export class AsignarAlumnosComponent implements OnInit {

  curso: Curso;
  alumnosAsignar:Alumno[] = [];
  alumnos: Alumno[] = [];

  dataSource: MatTableDataSource<Alumno>;
  @ViewChild(MatPaginator,{static:true} ) paginator : MatPaginator;

  tabIndex: number = 0;

  mostrarColumnas: string[] = ['nombre','apellido','selecionar'];
  mostrarColumnasAlumnos: string[] = ['id','nombre','apellido','email','eliminar'];

  seleccionar: SelectionModel<Alumno> = new SelectionModel<Alumno>(true,[]);

  constructor(private route:ActivatedRoute,
              private cursoService: CursoService,
              private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params =>{
      const id: number = +params.get('id');
      this.cursoService.ver(id).subscribe( c => {
        this.curso = c;
        this.alumnos = this.curso.alumnos;
        this.iniciarPaginador ();
      });
    });
  }
  iniciarPaginador ():void{
    this.dataSource = new MatTableDataSource<Alumno>(this.alumnos);
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
  }

  filtrar(nombre: string):void{
    nombre = nombre !== undefined? nombre.trim():'';
    if ( nombre !== ''){
      this.alumnoService.fitrarPorNombre(nombre).subscribe( alumnos=> this.alumnosAsignar = alumnos.filter(a =>{
        let filtrar = true ;
        this.alumnos.forEach(ca =>{
          if ( a.id === ca.id ){
            filtrar = false;
          }
        });
        return filtrar;
      }));
    }
  }
  estanTodosSeleccionados():boolean{
    const seleccionados = this.seleccionar.selected.length;
    const numAlumnos = this.alumnosAsignar.length;
    return( seleccionados === numAlumnos)
  }

  seleccionarDesSelecionarTodos() : void{
      this.estanTodosSeleccionados()? this.seleccionar.clear() :
      this.alumnosAsignar.forEach( a => this.seleccionar.select(a));
  }

  asignar() : void{
    this.cursoService.asignaAlumnos( this.curso, this.seleccionar.selected)
    .subscribe ( c=> {
      this.tabIndex =2;
      Swal.fire(
        'Asignados:',
        `Alumnos asignados con exito al curso ${this.curso.nombre}`,
        'success'
      );
      this.alumnos = this.alumnos.concat(this.seleccionar.selected);
      this.iniciarPaginador ();
      this.alumnosAsignar = [];
      this.seleccionar.clear();
    },
    e =>{
      if (e.status === 500){
        const mensaje = e.error.message as string;
        if (mensaje.indexOf('ConstraintViolationException') > -1){
          Swal.fire(
            'Cuidado',
            'No se puede asirnar, el alumno ya esta asociado a otro curso',
            'error'
          )
        }
      }
    }
     );

  }
  eliminarAlumno(alumno:Alumno): void {

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
        this.cursoService.eliminarAlumno(this.curso, alumno)
        .subscribe(curso =>{
        this.alumnos = this.alumnos.filter( a=> a.id !== alumno.id);
        this.iniciarPaginador ();
        Swal.fire(
          'Eliminado:',
          `Alumno ${alumno.nombre} eliminado con exito del curso ${curso.nombre}.`,
          'success'
        );
        });
      }
    });


  }

}
