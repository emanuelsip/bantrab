import { Component, OnInit, OnDestroy } from '@angular/core';

import { ToastService } from '../toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { HttpProviderService } from '../Service/http-provider.service';


@Component({
  selector: 'app-agregar-empresa',
  templateUrl: './agregar-empresa.component.html',
  styleUrls: ['./agregar-empresa.component.scss']
})


export class AgregarEmpresaComponent implements OnInit {
  empresaForm: empresaDatos = new empresaDatos();

  datosEmpresa: FormGroup = this.fbuilder.group({
    nombre_comercial: ["", Validators.required],
    razon_social: ["", Validators.required],
    telefono: ["", Validators.required],
    correo: ["", [Validators.required, Validators.email]],
    nit: ["", Validators.required],
    direccion: ["", Validators.required],
    estado: ["Activo"],
  });
  
  constructor(private router: Router, 
              private httpProvider: HttpProviderService, 
              private fbuilder: FormBuilder,
              private toastService: ToastService
              ) { }


  ngOnInit(): void {
  
  }
  validarCampos(campo:string){
    return this.datosEmpresa.controls[campo].errors&&this.datosEmpresa.controls[campo].touched;
  }
  // validarIndividual(campo:string){
  //   return this.datosEmpresa.controls[campo].errors&&this.datosEmpresa.controls[campo].touched ;
  // }
  crearEmpresa() {
    console.log(this.datosEmpresa.valid,'gardar');
    
    if (this.datosEmpresa.valid) {
      let dataForm = {empresa:{}};
        this.empresaForm.nombre_comercial = this.datosEmpresa.get('nombre_comercial')?.value;
        this.empresaForm.razon_social = this.datosEmpresa.get('razon_social')?.value;
        this.empresaForm.telefono = this.datosEmpresa.get('telefono')?.value;
        this.empresaForm.correo = this.datosEmpresa.get('correo')?.value;
        this.empresaForm.nit = this.datosEmpresa.get('nit')?.value;
        this.empresaForm.direccion = this.datosEmpresa.get('direccion')?.value;
        this.empresaForm.estado = 'Activo';
        dataForm.empresa = this.empresaForm;
        
       this.httpProvider.postGuardaEmpresa(dataForm).subscribe(async data => {
        this.toastService.show('Guardado correctamente', { classname: 'bg-success text-light', delay: 5000 }); 
       },
        err => this.checkError(err.error)
       );
    }else{
      this.datosEmpresa.markAllAsTouched();
    }
  }
  checkError(error:any){
     let messages :string = '';
    if(error.correo!==undefined){
      messages+= '* Correo ya utilizado ';
    }
    if(error.razon_social!==undefined){
      messages+= '* Razon social ya utilizada';
    }
    if(error.nit!==undefined){
      messages+= '* Nit ya utilizado';
    }
    this.toastService.show('Error al guardar '+messages, { classname: 'bg-danger text-light', delay: 5000 });
  }
}

export class empresaDatos {
  nombre_comercial: string = "";
  razon_social: string = "";
  telefono: string = "";
  correo: string = "";
  nit: string = "";
  direccion: string = "";
  estado: string = "";
}