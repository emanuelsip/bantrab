import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaEmpresasComponent } from './lista-empresas/lista-empresas.component';
import { AgregarEmpresaComponent } from './agregar-empresa/agregar-empresa.component';
import { EditarEmpresaComponent } from './editar-empresa/editar-empresa.component';
import { VerEmpresaComponent } from './ver-empresa/ver-empresa.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastsContainer } from './toast-container/toast-container.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    ListaEmpresasComponent,
    AgregarEmpresaComponent,
    EditarEmpresaComponent,
    VerEmpresaComponent,
    ToastsContainer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    
    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
