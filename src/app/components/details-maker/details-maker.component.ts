import { ChangeDetectorRef, Component, Inject, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { addTarea, datosHabilidad } from 'src/app/interface/interfacesDB';
import { SkillMakerService } from 'src/app/services/skill-maker.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-details-maker',
  templateUrl: './details-maker.component.html',
  styleUrls: ['./details-maker.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsMakerComponent implements OnInit {

  public detallesHacedor!: FormGroup;
  public habilidadHacedor!: FormGroup;
  public formControlCode = new FormControl();
  public listaTareas: string[] = [];
  public tareas!: addTarea[];
  // public idTareas!:number[];
  public filtrarLista: Observable<string[]>;
  allProduct: string[] = [];

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public matDialogRef: MatDialogRef<DetailsMakerComponent>,
    private _taskService: TaskService,
    private _skillMaker: SkillMakerService,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: boolean

  ) {
    this.filtrarLista = new Observable();

  }

  ngOnInit(): void {
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

    this.detallesHacedor = this._formBuilder.group({
      idTarea: [''],
      precio: [''],
      radio: ['']
    })
  }

  /**
   * metodo que obtiene los cambios en el formulario de login
   * @param formulario 
   */
  onSubmit() {
    console.log(this.detallesHacedor.value);
  }

  /**
    * Get all products
    * @param codeCategory
    */
  guardarDatos(codeCategory: string) {

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
   * 
   */
  crearHabilidad() {
    var datos: datosHabilidad = this.detallesHacedor.value;

    for (let index = 1; index < this.tareas.length; index++) {
      var tarea = this.tareas[index];
      if (this.tareas[index].nombre == this.formControlCode.value) {
        this._skillMaker.habilidad.emit({
          data: tarea, formulario: this.detallesHacedor.value
        })
        this.detallesHacedor = this._formBuilder.group({
          idTarea: [index],
          precio: [datos.precio],
          radio: [datos.radio],
        });
        console.log("dentro del metodo", this.detallesHacedor.value)
        this.matDialogRef.close();
      }
    }
  }



  Close(): void {
    this.matDialogRef.close();
  }


}
