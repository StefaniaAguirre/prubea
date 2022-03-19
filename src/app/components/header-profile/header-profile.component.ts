import { Component, Input, OnInit } from '@angular/core';
import { AddMaker, Customer } from 'src/app/interface/interfacesDB';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.css']
})
export class HeaderProfileComponent implements OnInit {

  @Input('nombre') nombre!:string;
  // public cliente!:Customer;
  // public hacedor!: AddMaker;

  constructor(
    private _userService :UserService,
  ) {}

  ngOnInit(): void {
    
  }

}
