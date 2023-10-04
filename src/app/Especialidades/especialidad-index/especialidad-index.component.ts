import { Component, OnInit } from '@angular/core';
import { EspecialidadService } from '../especialidad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-especialidad-index',
  templateUrl: './especialidad-index.component.html',
  styleUrls: ['./especialidad-index.component.css']
})
export class EspecialidadIndexComponent implements OnInit {

  public listEspecialidades: any;

  constructor(private service: EspecialidadService, private router: Router) { }

  ngOnInit(): void {
    this.service.obtenerEspecialidades().subscribe(
      result => {
      this.listEspecialidades = result.data
      console.log(this.listEspecialidades);
      
      },
      error => {
      console.log(error);
      }
    )
  }


  new(){
  this.router.navigateByUrl("/especialidades/nuevo");
  }

}
