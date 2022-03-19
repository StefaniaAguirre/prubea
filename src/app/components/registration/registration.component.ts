import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddUsuario, Administrador } from 'src/app/interface/interfacesDB';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  formulario: FormGroup;

  constructor() {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]),
      edad: new FormControl('', [Validators.required, Validators.pattern(/^((\\+91-?)|0)?[0-9]{1,2}$/)]),
      telefono: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      correo: new FormControl('', [Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]),
      direccion: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]),
      rol : new FormControl('',[Validators.required]),
    })
  }
  ngOnInit(): void {

  }

  /**
   * 
   * @param formulario 
   */
  onSubmit() {
    console.log(this.formulario.value);
  }

  /**
   * 
   */
  agregarUsuario() {

    var rol = Number((document.getElementById("rol") as HTMLInputElement).value);
    if (rol == 1) {
      console.log("hacedor", rol);
    } else {
      console.log("cliente", rol);
    }
    var administrador: Administrador = {
      nombre: (document.getElementById("nombre") as HTMLInputElement).value,
      correo: (document.getElementById("staticEmail") as HTMLInputElement).value,
      contrasena: (document.getElementById("contrasena") as HTMLInputElement).value,
    }
    var usuario: AddUsuario = {
      usuario: administrador,
      edad: Number((document.getElementById("edad") as HTMLInputElement).value),
      telefono: (document.getElementById("telefono") as HTMLInputElement).value,
      direccion: (document.getElementById("direccion") as HTMLInputElement).value,
      // rol: rol
    }
    console.log(usuario)
  }

}
