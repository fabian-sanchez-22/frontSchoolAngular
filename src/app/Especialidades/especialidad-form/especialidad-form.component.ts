import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EspecialidadService } from '../especialidad.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-especialidad-form',
  templateUrl: './especialidad-form.component.html',
  styleUrls: ['./especialidad-form.component.css']
})
export class EspecialidadFormComponent implements OnInit {

  public frmEspecialidad: FormGroup;
  public id = 0;

  constructor(private service: EspecialidadService,
              private activatedRoute: ActivatedRoute,
              private toast: ToastrService,
              private router: Router
              ) {

    this.id = this.activatedRoute.snapshot.params['id'];

    this.frmEspecialidad = new FormGroup({
      nombre: new FormControl(null, Validators.required)
    });
  }


  ngOnInit(): void {
    if (this.id && this.id != 0){
    this.service.obtenerPorId(this.id).subscribe(
      result => {

      this.frmEspecialidad.controls['nombre'].setValue(result.data.nombre)
      }
      )
    }
  }

  guardar() {
    if (this.frmEspecialidad.invalid) {
      this.toast.warning("Debe llenar todos los campos")
      return
    }

    let data = {
      "nombre": this.frmEspecialidad.controls['nombre'].value
    }

    this.service.guardar(data, this.id).subscribe(
      result => {
        this.toast.success("Especialidad guardada")
        this.router.navigate(['/especialidades']);
      }
    )
  }

}
