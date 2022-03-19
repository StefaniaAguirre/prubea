import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { addServicio } from '../interface/interfacesDB';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private http: HttpClient
  ) { }


  /**
   * Registrar solicitud de un servicio
   * metodo que permite crear un sevicio
   * @param servicio 
   * @returns 
   */
  crearServicio(servicio:addServicio){
    const path = 'http://localhost:8080/api/servicio';
    return this.http.post(path, servicio);
  }

  /**
   * metodo que permite listar todos los servicios solicitados
   * @returns 
   */
  ObtenerServicios(){
    const path = '';
    return this.http.get<addServicio[]>(path);
  }

  /**
   * metodo que permite buscar y obtener un servicio por id
   * @param idServicio identificador del servicio
   * @returns 
   */
  obtenerServicio(idServicio:number){
    const path = '';
    return this.http.get<addServicio>(path);
  }

  /**
   * Consultar solicitudes de servicios para las que un hacedor cumple las condiciones
   *  @param idHacedor identificador del hacedor que cumple con las condiciones del servicio que se va listar
   * @returns retorna los servicios, para las que ell hacedor cumple las condiciones
   */
  obtenerServiciosCumplenCondiciones(idHacedor:number){
    const path = 'http://localhost:8080/api/servicio/listarDetalleServicio/${idHacedor}';
    return this.http.get<addServicio[]>(path);
  }


  /**
   * Consultar detalle de un servicio aceptado
   * @param idServicio 
   * @returns 
   */
  obtenerServicioAceptado(idServicio:number){
    const path = 'http://localhost:8080/api/servicio/detalleServicioAceptado/${idServicio}';
    return this.http.get<addServicio>(path);
  }

}
