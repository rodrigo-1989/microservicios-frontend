import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from '../../services/alumno.service';
import { CommonListarComponent } from '../common-listar.component';
import { BASE_ENDPOINT } from '../../config/app';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent extends CommonListarComponent<Alumno, AlumnoService> implements OnInit {

  baseEndPoint = BASE_ENDPOINT+'/alumnos';
  constructor(service: AlumnoService) {
    super(service);
    this.titulo ='°_° Listado de alumnos °_°';
    this.nombreModel = Alumno.name;
   }


}
