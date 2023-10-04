import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-especialidad-form',
  templateUrl: './especialidad-form.component.html',
  styleUrls: ['./especialidad-form.component.css']
})
export class EspecialidadFormComponent implements OnInit {

  constructor() {
  this.frmEspecialidad = new FormGroup({
  nombre: new FormControl(null, Validators.required)
  });
  }

  public frmEspecialidad: FormGroup;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  guardar(){
  
  }

}
