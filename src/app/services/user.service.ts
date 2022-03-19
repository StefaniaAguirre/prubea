import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddHabilidadHacedor, AddMaker, AddUsuario, Administrador, Customer, detallesHacedor } from '../interface/interfacesDB';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @Output() datosUsuario: EventEmitter<any> = new EventEmitter();

  constructor
    (
      private http: HttpClient
    ) { }


  /**
   * Metodo para obtener el cliente logueado
   * @param correo correo del cliente
   * @param contrasena  contraseña del cliente
   * @returns Cliente
   */
  obtenerCliente(correo: String, contrasena: String) {
    const path = `http://localhost:8080/api/cliente/loginCliente/${correo}&&${contrasena}`;
    return this.http.get<Customer>(path);
  }

  /**
   * Metodo para obtener el hacedor logueado
   * @param correo correo del hacedor
   * @param contrasena  contraseña del hacedor
   * @returns Hacedor
   */
   obtenerHacedor(correo: String, contrasena: String) {
    const path =  `http://localhost:8080/api/hacedor/loginHacedor/${correo}&&${contrasena}`;
    return this.http.get<AddMaker>(path);
  }

  /**
   * Metodo para obtener el hacedor Administrador
   * @param correo correo del Administrador
   * @param contrasena  contraseña del Administrador
   * @returns Administrador
   */
   obtenerAdministrador(correo: String, contrasena: String) {
    const path = `http://localhost:8080/api/administrador/loginAdministrador/${correo}&&${contrasena}`;
    return this.http.get<Administrador>(path);
  }

  /**
   * Registrar usuarios por rol (Cliente, Hacedor)
   * metodo que permite crear un usuario dependiendo de su rol
   * @param usuario usuario
   * @param rol rol del usuario(Cliente = 1 o Hacedor = 2)
   * @returns la petición http
   */
  crearUsuario(usuario: AddUsuario, rol: number) {

    if (rol == 1) {
      const path = `http://localhost:8080/api/cliente`;
      return this.http.post(path, usuario);
    } else if (rol == 2) {
      const path = `http://localhost:8080/api/hacedor`;
      return this.http.post(path, usuario);
    }
    return null;
  }

  /**
   * Registrar los detalles del perfil hacedor
   * metodo que permite crear la habilidad del hacedor
   * @param habilidadHacedor 
   * @returns 
   */
  crearHabilidadHacedor(habilidadHacedor: AddHabilidadHacedor):Observable<any> {
    const path = `http://localhost:8080/api/habilidadHacedor`;
    return this.http.post(path, habilidadHacedor);
  }

  /**
   * Consultar los detalles del perfil hacedor
   * metodo que me permite obtener los detalles de un hacedor por medio de un id
   * @param idHacedor identificador del hacedor
   * @returns una lista con los detalles del hacedor
   */
  obtenerDetallesHacedor(idHacedor: number) {
    const path = `http://localhost:8080/api/hacedor/listarDetalle/${idHacedor}`;
    return this.http.get<any[]>(path);
  }
}
