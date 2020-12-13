import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Examen } from '../models/examen';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends CommonService<Examen>{

  protected baseEndPoint = 'http://localhost:8090/api/examenes';
}
