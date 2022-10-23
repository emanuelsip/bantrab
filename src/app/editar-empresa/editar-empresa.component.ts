import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpProviderService } from '../Service/http-provider.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.scss']
})
export class EditarEmpresaComponent implements OnInit {
  
  empresaForm: empresaDatos = new empresaDatos();
  idEmpresa: any;

  datosEmpresa: FormGroup = this.fbuilder.group({
    nombre_comercial: [null, Validators.required],
    razon_social: [null, Validators.required],
    telefono: [null, Validators.required],
    correo: [null, [Validators.required, Validators.email]],
    nit: [null, Validators.required],
    direccion: [null, Validators.required],
    estado:[null]
  });
  
  constructor(private router: Router, 
              private route: ActivatedRoute,
              private httpProvider: HttpProviderService, 
              private fbuilder: FormBuilder,
              private toastService: ToastService
              ) { }


  validarCampos(campo:string){
    return this.datosEmpresa.controls[campo].errors && this.datosEmpresa.controls[campo].touched;
  }
  ngOnInit(): void {
    this.idEmpresa = this.route.snapshot.params['empresaId'];
    this.obtenerEmpresa(this.idEmpresa);
  }
  obtenerEmpresa(id:number) {
    this.httpProvider.getInfoEmpresas(id).subscribe(async(data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        console.log(data);
        
        if (resultData) {
          this.datosEmpresa.setValue({
            nombre_comercial:resultData.nombre_comercial,
            razon_social:resultData.razon_social,
            telefono:resultData.telefono,
            correo:resultData.correo,
            nit:resultData.nit,
            direccion:resultData.direccion,
            estado:resultData.estado
          });
          
          console.log(this.empresaForm);
          
        }
      }
    },
      (error: any) => { });
  }

  actualizarEmpresa() {
    
    
    if (this.datosEmpresa.valid) {
      let dataForm = {empresa:{}};
        this.empresaForm.nombre_comercial = this.datosEmpresa.get('nombre_comercial')?.value;
        this.empresaForm.razon_social = this.datosEmpresa.get('razon_social')?.value;
        this.empresaForm.telefono = this.datosEmpresa.get('telefono')?.value;
        this.empresaForm.correo = this.datosEmpresa.get('correo')?.value;
        this.empresaForm.nit = this.datosEmpresa.get('nit')?.value;
        this.empresaForm.direccion = this.datosEmpresa.get('direccion')?.value;
        this.empresaForm.estado = 'Actualizado';
        dataForm.empresa = this.empresaForm;
      
        this.httpProvider.putInfoEmpresas(dataForm,this.idEmpresa).subscribe(async data => {
          this.toastService.show('Guardado correctamente', { classname: 'bg-success text-light', delay: 5000 }); 
        },
          err => this.checkError(err.error)
      );
       
    }else{
      this.datosEmpresa.markAllAsTouched();
    }
  }
  checkError(error:any){
    this.toastService.show('Error al guardar', { classname: 'bg-danger text-light', delay: 5000 }); 
     if(error.correo!==undefined){
      this.datosEmpresa.controls["correo"].setErrors({'incorrect': true});
     }
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
