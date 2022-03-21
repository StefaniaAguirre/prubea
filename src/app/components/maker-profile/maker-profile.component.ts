import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, startWith, subscribeOn } from 'rxjs';
import { AddMaker, addTarea, detallesHacedor, HabilidadHacedor } from 'src/app/interface/interfacesDB';
import { OfferService } from 'src/app/services/offer.service';
import { ServiceService } from 'src/app/services/service.service';
import { SkillMakerService } from 'src/app/services/skill-maker.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-maker-profile',
  templateUrl: './maker-profile.component.html'
})
export class MakerProfileComponent implements OnInit {

  public detallesHacedor!: FormGroup;
  public habilidadHacedor!: FormGroup;
  public formControlCode = new FormControl();
  public listaTareas: string[] = [];
  public tareas!: addTarea[];
  public filtrarLista!: Observable<string[]>;
  public allProduct: string[] = [];
  public hacedor!: AddMaker;
  public nombre!: string;
  public detalleHacedor!: any;
  public idHacedor!: number;
  public serviciosOfertados!: any;

  constructor(
    private _userService: UserService,
    private _serviceService: ServiceService,
    private _matDialog: MatDialog,
    private _skillMaker: SkillMakerService,
    private activeRoute: ActivatedRoute,
    private _offerService: OfferService,
    private _taskService: TaskService,
    private _formBuilder: FormBuilder,
    private _changeDetectorRef: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {

    this.detallesHacedor = new FormGroup({
      nombreTarea: new FormControl(''),
      precio: new FormControl(''),
      radio: new FormControl('')
    })

    this._taskService.obtenerTareas().subscribe(result => {
      this.tareas = result;
      this.tareas.forEach(element => {
        this.listaTareas.push(element.nombre);
      });

      this.filtrarLista = this.formControlCode.valueChanges.pipe(
        startWith(''),
        map(value => this.mat_filterlistTask(value, this.listaTareas))
      );
    })

    //obteniendo el id que se envía por parametro en el router
    this.idHacedor = Number(this.activeRoute.snapshot.queryParamMap.get("id"));
    console.log(this.idHacedor)

    //obteniendo los datos del hacedor
    this._userService.obtenerDatosHacedor(this.idHacedor).subscribe(result => {
      console.log("datos Hacedor", result);
      this.nombre = result.nombre;
      this.hacedor = result;
    });
    //obteniendo las habilidades del hacedor por id
    this._userService.obtenerDetallesHacedor(this.idHacedor).subscribe(result => {
      this.detalleHacedor = result;
      console.log(result);
    });

    //ofertas a los que un hacedor cumple las condiciones

    this._offerService.obtenerOfertas
    //servicios a los que un hacedor cumple con las condiciones
    this._serviceService.obtenerServiciosCumplenCondiciones(this.idHacedor).subscribe(result => {
      this.serviciosOfertados = result;

      // //crear La oferta calculando el precio base para mostrarle las ofertas al hacedor
      // this._offerService.crearOferta().subscribe(result => {

      // })
      console.log(result);
    })

    this._userService.datosUsuario.subscribe(result => {
      this.hacedor = result.data;
      this.nombre = this.hacedor.nombre;
    });
  }

  /**
  * Filter to get the codes
  * @param value
  * @param names
  * @returns
  */
  private mat_filterlistTask(value: string, names: string[]): string[] {
    const filterValueProducts = value.toLowerCase();
    return this.allProduct.filter(option => option.toLowerCase().includes(filterValueProducts));
  }

  /**
    * Get all products
    * @param codeCategory
    */
  guardarDatos(nombre: string) {
  }


  /**
  * metodo que obtiene los cambios en el formulario de login
  * @param formulario 
  */
  onSubmit() {
    console.log(this.detallesHacedor.value);
  }

  //Se abre el matDialog para agregar la habilidad
  crearHabilidad() {

    this.tareas.forEach(element => {
      if (element.nombre == this.formControlCode.value) {

        var habilidadHacedor: HabilidadHacedor = {
          idTarea: element,
          idHacedor: this.hacedor,
          precioHabilidad: this.detallesHacedor.value.precio,
          radio: this.detallesHacedor.value.radio,
        }
        this._userService.crearHabilidadHacedor(habilidadHacedor).subscribe(result => {
          console.log(result);
        })
      }
    });
    this._changeDetectorRef.markForCheck();
    this.ngOnInit();
  }

}
