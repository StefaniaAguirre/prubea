import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddMaker, Customer } from 'src/app/interface/interfacesDB';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // @Output() datosUsuario: EventEmitter<any> = new EventEmitter();
  login: FormGroup;

  constructor(
    private _userService :UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) {
    this.login = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]),
    })
  }

  ngOnInit(): void {
  }

  /**
   * metodo que obtiene los cambios en el formulario de login
   * @param formulario 
   */
  onSubmit() {
    console.log(this.login.value);
  }

  /**
   * metodo para iniciar sesion
   */
  iniciarSesion() {
    var correo:String =this.login.value.correo;
    var contrasena:String=this.login.value.contrasena;
    this._userService.obtenerCliente(correo, contrasena).subscribe(result =>{
        if(result == null){
          this._userService.obtenerHacedor(correo, contrasena).subscribe(result =>{
            if(result == null){
              console.log("no es un usuario Registrado");
            }else{
              var maker :AddMaker = result;
              this._userService.datosUsuario.emit({
                data:maker
              })
              console.log("Hacedor", result);
              this._router.navigate(['/makerProfile'], { relativeTo: this._activatedRoute })
            }
          })
        }else{
          var user:Customer= result;
            this._userService.datosUsuario.emit({
              data:user
            }) 
            console.log("Cliente", result);
            this._router.navigate(['/customerProfile'], { relativeTo: this._activatedRoute })

        }
    })
  }
}
