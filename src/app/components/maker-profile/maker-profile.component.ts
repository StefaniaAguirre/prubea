import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMaker, detallesHacedor, HabilidadHacedor } from 'src/app/interface/interfacesDB';
import { SkillMakerService } from 'src/app/services/skill-maker.service';
import { UserService } from 'src/app/services/user.service';
import { DetailsMakerComponent } from '../details-maker/details-maker.component';

@Component({
  selector: 'app-maker-profile',
  templateUrl: './maker-profile.component.html',
  styleUrls: ['./maker-profile.component.css']
})
export class MakerProfileComponent implements OnInit {

  public hacedor!: AddMaker;
  public nombre!: string;
  public detallesHacedor!: detallesHacedor;

  constructor(
    private _userService: UserService,
    private _matDialog: MatDialog,
    private _skillMaker: SkillMakerService,
  ) {

  }

  ngOnInit(): void {
    this._userService.datosUsuario.subscribe(result => {
      this.hacedor = result.data;
      this.nombre = this.hacedor.nombre;
      this._userService.obtenerDetallesHacedor(this.hacedor.idMaker).subscribe(result => {
        
          // this.detallesHacedor = result;
          
        }
      )
    });
  }

  crearHabilidad() {

    const dialogRef = this._matDialog.open(DetailsMakerComponent, { data: true });
    dialogRef.afterClosed().subscribe((result) => {
      var habilidadHacedor: HabilidadHacedor = {
        idTarea: result.idTarea,
        idHacedor: this.hacedor.idMaker,
        precioHabilidad: result.precio,
        radio: result.radio
      }
      console.log(habilidadHacedor)
     
      this._skillMaker.crearHabilidad(habilidadHacedor).subscribe(result =>{
        console.log(result);
      })
    })
  }

}
