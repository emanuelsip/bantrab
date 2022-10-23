import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AgregarEmpresaComponent} from  './agregar-empresa/agregar-empresa.component';
import {EditarEmpresaComponent} from  './editar-empresa/editar-empresa.component';
import {ListaEmpresasComponent} from  './lista-empresas/lista-empresas.component';
import {VerEmpresaComponent} from  './ver-empresa/ver-empresa.component';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full'},
  { path: 'Home', component: ListaEmpresasComponent },
  { path: 'ver/:empresaId', component: VerEmpresaComponent },
  { path: 'Agregar', component: AgregarEmpresaComponent },
  { path: 'Editar/:empresaId', component: EditarEmpresaComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
