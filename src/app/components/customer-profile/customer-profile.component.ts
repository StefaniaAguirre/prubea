import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { isEmpty, map, Observable, startWith } from 'rxjs';
import { addOferta, addTarea, Customer, servicioCliente, servicioSolicitado, verificarServicio } from 'src/app/interface/interfacesDB';
import { OfferService } from 'src/app/services/offer.service';
import { ServiceService } from 'src/app/services/service.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  public cliente!: Customer;
  public nombre!: string;
  public idCliente!: number;
  public serviciosCliente!: servicioCliente[];
  public formulario!: FormGroup;
  public listaTareas: string[] = [];
  public tareas!: addTarea[];
  public formControlCode = new FormControl();

  public filtrarLista!: Observable<string[]>;

  public allProduct: string[] = [];


  constructor(
    private _userService: UserService,
    private _serviceServices: ServiceService,
    private activeRoute: ActivatedRoute,
    private _taskService: TaskService,
    private _matDialog: MatDialog,
    private _offerService: OfferService,
  ) {

  }

  ngOnInit(): void {

    this.idCliente = Number(this.activeRoute.snapshot.queryParamMap.get("id"));
    console.log(this.idCliente)

    //obteniendo el usuario logueado
    this._userService.obtenerDatosCliente(this.idCliente).subscribe(result => {
      this.cliente = result;
      this.nombre = this.cliente.nombre;
    })

    //obteniendo los servicios solicitados por el cliente cuando la oferta es creada,
    //una oferta es creada solo si hay hacedores que cumplen con las condiciones
    this._serviceServices.ObtenerServiciosCliente(this.idCliente).subscribe(result => {
      console.log(result);

      this.serviciosCliente = result;
    })

    this._userService.datosUsuario.subscribe(result => {
      this.cliente = result;
      console.log("hola", this.cliente);
      this.nombre = this.cliente.nombre;
    });

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

    this.formulario = new FormGroup({
      item: new FormControl(''),
      descripcion: new FormControl(''),
      precioServicio: new FormControl(''),
    })
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
  * metodo que obtiene los cambios en el formulario de login
  * @param formulario 
  */
  onSubmit() {

  }

  /**
   * 
   */
  crearServicio() {

    const nombreTarea: string = this.formControlCode.value;

    console.log(this.formulario.value);
    
    this._taskService.obtenerTarea(nombreTarea).subscribe(result => {
      var tarea: addTarea = result;
      console.log(tarea);
      
      var servicio: servicioSolicitado = {
        item: Number(this.formulario.value.item),
        descripcion: this.formulario.value.descripcion,
        pagoRealizado: false,
        tareaTerminada: false,
        idCliente: this.cliente,
        idTarea: tarea,
        precioServicio: Number(this.formulario.value.precioServicio),
      }

      this._serviceServices.crearServicio(servicio).subscribe(result => {
        console.log("servicio creado");
        //verificar si existen hacedores para crear la oferta y notificar
        this._serviceServices.verificarServicio(tarea.idTarea).subscribe(result => {
          var verificacion: verificarServicio[] = result;
          if (verificacion != null) {
            //cacula el precio
            var contador: number = 0;
            for (let iterator of verificacion) {
              contador += Number(iterator.precioHabilidad);
            }
            contador = (contador)/(verificacion.length);
            console.log("promedio de las tareas", contador);
            console.log("PrecioServicio",servicio.precioServicio );
            
            let precioBase:number = (contador + servicio.precioServicio)/2;
           console.log("precio final:" ,precioBase);
            
            //se crea la oferta
            var oferta: addOferta = {
              notificacion: servicio.descripcion,
              fecha: new Date(),
              tiempoVida: 24,
              esAceptada: false,
              precioBase: precioBase,
            }
            this._offerService.crearOferta(oferta).subscribe(result => {
              console.log(result);
            })
    
          } else {
            //notificar al cliente que no hay hacedores que cumplen con las condiciones
            this._matDialog.open(DialogElementsDialog);
          }
      })
    })
    })
    this.ngOnInit();
  }
}

@Component({
  selector: 'dialog-elements-dialog',
  templateUrl: 'dialog-elements-dialog.html',
})
export class DialogElementsDialog { }
