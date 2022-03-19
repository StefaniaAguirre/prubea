import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { addOferta } from '../interface/interfacesDB';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(
    private http:HttpClient
  ) { }


  /**
   * metodo que permite aceptar o rechazar una oferta
   * @param oferta oferta 
   * @param estado true o false si aceptan o rechazan la oferta
   * @returns 
   */
  aceptarRechazarOferta(oferta:addOferta, estado:boolean){
    const path = 'http://localhost:8080/api/oferta/actualizar/${oferta.idOferta}&&${estado}';
    return this.http.put<addOferta>(path, oferta)
  }

  /**
   * metodo que permite obtener una oferta por su id
   * @param idOferta identificador de la oferta
   * @returns 
   */
  obtenerOferta(idOferta:number){
    const path = '';  
    return this.http.get<addOferta>(path)
  }

  /**
   * metodo que permite obtener todas las ofertas
   * @returns 
   */
  obtenerOfertas(){
    const path = '';  
    return this.http.get<addOferta[]>(path)
  }

  /**
   * metodo para crear la oferta 
   * @param oferta 
   */
  crearOferta(oferta:addOferta){
    const path = '';  
    return this.http.post(path, oferta);
  } 
}
