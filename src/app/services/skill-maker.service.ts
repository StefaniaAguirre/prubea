import { HttpClient } from '@angular/common/http';
import { outputAst } from '@angular/compiler';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { addTarea, datosHabilidad, HabilidadHacedor } from '../interface/interfacesDB';

@Injectable({
  providedIn: 'root'
})
export class SkillMakerService {

  @Output() habilidad: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }



  /**
   * metodo para crear una habilidad para 
   * @param habilidad 
   * @returns 
   */
  crearHabilidad(habilidad: HabilidadHacedor) {
    const path = `http://localhost:8080/api/habilidadHacedor`;
    return this.http.post(path, habilidad);
  }

}
