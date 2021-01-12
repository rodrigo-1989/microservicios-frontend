import { Component, OnInit } from '@angular/core';
import { Curso } from '../../models/curso';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../../services/curso.service';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from 'src/app/models/alumno';

@Component({
  selector: 'app-asignar-alumnos',
  templateUrl: './asignar-alumnos.component.html',
  styleUrls: ['./asignar-alumnos.component.css']
})
export class AsignarAlumnosComponent implements OnInit {

  curso: Curso;
  alumnosAsignar:Alumno[];
  mostrarColumnas: string[] = ['nombre','apellido'];
  constructor(private route:ActivatedRoute,
              private cursoService: CursoService,
              private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params =>{
      const id: number = +params.get('id');
      this.cursoService.ver(id).subscribe( c => this.curso = c);
    });
  }

  filtrar(nombre: string):void{
    nombre = nombre !== undefined? nombre.trim():'';
    if ( nombre !== ''){
      this.alumnoService.fitrarPorNombre(nombre).subscribe( alumnos=> this.alumnosAsignar = alumnos);
    }
  }

}
