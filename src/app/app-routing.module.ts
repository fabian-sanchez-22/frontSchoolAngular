import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecialidadIndexComponent } from './Especialidades/especialidad-index/especialidad-index.component';
import { EspecialidadFormComponent } from './Especialidades/especialidad-form/especialidad-form.component';
import { EspecialidadGuard } from './especialidad.guard';

const routes: Routes = [
{path: 'especialidades', component: EspecialidadIndexComponent, canActivate: [EspecialidadGuard]},
{path: 'especialidades/nuevo', component: EspecialidadFormComponent},
{path: 'especialidades/editar/:id', component: EspecialidadFormComponent},
{path: 'especialidades/eliminar/:id', component: EspecialidadFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
