import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { addTarea } from '../interface/interfacesDB';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http :HttpClient
  ) { }

  /**
   * Metodo que permite listar todas las tareas disponibles en el sistema 
   * como servicios que se pueden solicitar
   * @returns una lista de las tareas disponibles
   */
  obtenerTareas(){
    const path = `http://localhost:8080/api/tarea/listarTareas`;
    return this.http.get<addTarea[]>(path);
  }
}
