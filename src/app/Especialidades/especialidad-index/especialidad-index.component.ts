import { Component, OnInit, ViewChild } from '@angular/core';
import { EspecialidadService } from '../especialidad.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DatatableParameter } from 'src/app/utils/datatable-parameter';
import { data } from 'jquery';

@Component({
  selector: 'app-especialidad-index',
  templateUrl: './especialidad-index.component.html',
  styleUrls: ['./especialidad-index.component.css']
})
export class EspecialidadIndexComponent implements OnInit {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective | undefined;
  public optionsDatatable: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();

  private _datatableParameter: DatatableParameter = {} as DatatableParameter;

  public listEspecialidades: any;

  constructor(private service: EspecialidadService,
    private router: Router,
    private toast: ToastrService) { }

  ngOnInit(): void {
    // this.obtenerEspecialidades();
    this.loadTable();
  }

  ngAfterViewInit() {
    this.dtTrigger.next(void 0);
  }

  refreshTable() {
    if(typeof this.dtElement!.dtInstance != 'undefined') {
      this.dtElement!.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload();
      });
    }
  }

  loadTable() {
    const that = this;
    this.optionsDatatable = {
      serverSide: true,
      processing: true,
      ordering: true,
      responsive: true,
      paging: true,
      order: [0, 'asc'],
      ajax: (parameters: any, callback: any) => {
        this._datatableParameter.page = (parameters.start / parameters.length) ?? 0;
        this._datatableParameter.size = parameters.length;
        this._datatableParameter.column_order = parameters.columns[parameters.order[0].column].data.toString();
        this._datatableParameter.column_direction = parameters.order[0].dir;
        this._datatableParameter.search = parameters.search.value

        // this.eventDataExport.emit(this._datatableParameter);

        this.service.obtenerDatatable(this._datatableParameter).subscribe(res => {
          callback({
            recordsTotal: res.data.numberOfElements,
            recordsFiltered: res.data.totalElements,
            draw: parameters.draw,
            data: res.data.content
          });
        }, error => {
          callback({
            recordsTotal: 0,
            recordsFiltered: 0,
            draw: parameters.draw,
            data: []
          });
          // this._helperService.showMessageError(error);
        })
      },
      // language: LANGUAGE_DATATABLE,
      columns: [
        {
          title: 'ID',
          data: 'id'
        },
        {
          title: 'Nombre',
          data: 'nombre'
        },
        {
          title: 'Acciones',
          data: 'id',
          render: function (idRegistro) {
            return `<button data-id="${idRegistro}" class="btn-modificar btn btn-warning ms-1 me-3">Modificar</button>
                    <button data-id="${idRegistro}" class="btn-eliminar btn btn-danger" >Eliminar</button>`
          }
        },
      ],
      drawCallback: (settings: any) => {
        $('.btn-eliminar').off().on('click', (event) => {
          this.deletes(event.target.dataset['id']);
        });
        $('.btn-modificar').off().on('click', (event) => {
          this.edit(event.target.dataset['id'])
        });

      }
    };
  }

  obtenerEspecialidades() {
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

  new() {
    this.router.navigateByUrl("/especialidades/nuevo");
  }

  edit(id: any) {
    this.router.navigateByUrl(`/especialidades/editar/${id}`);
  }

  deletes(id: any) {
    this.service.deletes(id).subscribe(
      result => {
        this.toast.success("Registro eliminado")
        this.refreshTable();
      }
    )
  }

}
