import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  /**
   * 
   * @param formulario 
   */
  onSubmit(formulario:any ){
    console.log(formulario);
  }

}
