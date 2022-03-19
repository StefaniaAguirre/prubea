import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interface/interfacesDB';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  public cliente!: Customer;
  public nombre!: string;

  constructor(
    private _userService: UserService
  ) {

  }

  ngOnInit(): void {
    
      this._userService.datosUsuario.subscribe(result => {
        this.cliente = result;
        console.log("hola",this.cliente);
        this.nombre = this.cliente.nombre;
      }); 
  }
}
