import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddMaker, AddUsuario, Administrador, Customer, Rol } from 'src/app/interface/interfacesDB';
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
  mymodel = 0;

  formulario: FormGroup;
  valorseleccionado!: string;
  public formControlCode = new FormControl();
  public searchControl: FormControl = new FormControl();
  opcionesRol: Rol[] = [
    { value: 'Cliente', viewValue: 'Cliente' },
    { value: 'Hacedor', viewValue: 'Hacedor' }
  ];
  public modeselect = 'Cliente';

  constructor(
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) {

    this.login = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]),
    })

    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]),
      edad: new FormControl('', [Validators.required, Validators.pattern(/^((\\+91-?)|0)?[0-9]{1,2}$/)]),
      telefono: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      correo: new FormControl('', [Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]),
      direccion: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(40)]),
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
   * 
   */
  agregarUsuario() {

    var usuario: AddUsuario = {
      nombre: this.formulario.value.nombre,
      edad: Number(this.formulario.value.edad),
      telefono: this.formulario.value.telefono,
      direccion: this.formulario.value.direccion,
      correo: this.formulario.value.correo,
      contrasena: this.formulario.value.contrasena
    }

    var num: number = this.mymodel;
    this._userService.crearUsuario(usuario, num)?.subscribe(result => {
      if (this.mymodel == 2) {
        this._userService.obtenerHacedorCreado().subscribe(result => {
          this._router.navigate(['/makerProfile'], { queryParams: { id: result.idHacedor } })
        })
      } else if (this.mymodel == 1) {
        this._userService.obtenerClienteCreado().subscribe(result => {
          this._router.navigate(['/customerProfile'], { queryParams: { id: result.idCliente } });
        })
      }
    })

  }

  seleccionarRol() {

  }


  guardarDatos($event: any) {

  }

  /**
   * metodo para iniciar sesion
   */
  iniciarSesion() {
    var correo: String = this.login.value.correo;
    var contrasena: String = this.login.value.contrasena;
    this._userService.obtenerCliente(correo, contrasena).subscribe(result => {
      if (result == null) {
        this._userService.obtenerHacedor(correo, contrasena).subscribe(result => {
          if (result == null) {
            console.log("no es un usuario Registrado");
          } else {
            console.log(result);
            // var maker: AddMaker = result;
            // this._userService.datosUsuario.emit({
            //   data:maker
            // })
            var id = result.idHacedor;
            console.log("Hacedor", id);
            this._router.navigate(['/makerProfile'], { queryParams: { id: id } })
          }
        })
      } else {
        console.log(result);
        var id = result.idCliente;
        var customer: Customer = result;
        console.log("Cliente", id);
        this._router.navigate(['/customerProfile'], { queryParams: { id: id } });

      }
    })
  }
}
