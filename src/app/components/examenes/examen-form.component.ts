import { Component, OnInit } from '@angular/core';
import { ExamenService } from '../../services/examen.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Examen } from '../../models/examen';
import { CommonFormComponent } from '../common-form.component';
import { Asignatura } from '../../models/asignatura';
import { Pregunta } from 'src/app/models/pregunta';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-examen-form',
  templateUrl: './examen-form.component.html',
  styleUrls: ['./examen-form.component.css']
})
export class ExamenFormComponent extends CommonFormComponent<Examen , ExamenService> implements OnInit {

  asignaturasPadre: Asignatura []=[];
  asignaturasHija: Asignatura []=[];
  errorPregunta: string;

  constructor( service:ExamenService, router: Router, route :ActivatedRoute) {
      super(service, router, route );
      this.titulo = 'Crear Examen';
      this.model = new Examen();
      this.nombreModel = Examen.name;
      this.redirect = '/examenes';
   }
   ngOnInit(): void {
    this.route.paramMap.subscribe( params =>{
      const id: number = +params.get('id');
      if(id){
          this.service.ver(id).subscribe( m=> {
            this.model = m;
            this.titulo = 'Editar ' + this.nombreModel;
            this.service.findAllAsignatura().subscribe( asignaturas =>
                this.asignaturasHija = asignaturas.filter( a => a.padre && a.padre.id === this.model.asignaturaPadre.id)
            );
          });
      }
    });
    this.service.findAllAsignatura()
      .subscribe( asignaturas => this.asignaturasPadre = asignaturas.filter( a=> !a.padre));

  }
  public crear():void {
    if(this.model.preguntas.length === 0 ){
      this.errorPregunta = 'Examen debe tener preguntas';
      //Swal.fire('Error Preguntas','Examen debe tener preguntas','error');
      return;
    }
    this.errorPregunta = undefined;
    this.eliminarPreguntasVacias();
    super.crear();
  }
  public editar():void {
    if(this.model.preguntas.length === 0 ){
      this.errorPregunta = 'Examen debe tener preguntas';
      //Swal.fire('Error Preguntas','Examen debe tener preguntas','error');
      return;
    }
    this.errorPregunta = undefined;
    this.eliminarPreguntasVacias();
    super.editar();
  }
  cargarHijos(): void{
    this.asignaturasHija = this.model.asignaturaPadre? this.model.asignaturaPadre.hijos : [];
  }
  compararAsignatura(a1:Asignatura, a2:Asignatura):boolean{
    if(a1===undefined && a2===undefined){
      return true;
    }
    return (a1===undefined || a2===undefined || a1===null || a2===null) ? false : (a1.id === a2.id);
  }

  agregarPregunta():void{
    this.model.preguntas.push( new Pregunta());
  }
  asignarTexto(pregunta: Pregunta,event:any):void{
      pregunta.texto = event.target.value as string;
      console.log(this.model);

  }
  eliminarPregunta(pregunta):void{
    this.model.preguntas = this.model.preguntas.filter( p => pregunta.texto !== p.texto);
  }

  eliminarPreguntasVacias():void{
    this.model.preguntas = this.model.preguntas.filter( p=> p.texto != null && p.texto.length > 0);
  }

}
