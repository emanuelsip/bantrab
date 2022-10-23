import { Component, Input, OnInit, Type } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toast.service';
import { HttpProviderService } from '../Service/http-provider.service';

@Component({
  selector: 'ng-modal-confirm',
  template: `<div class="modal-header">
              <h5 class="modal-title" id="modal-title">Borrar empresa</h5>
              <button type="button" class="btn close" aria-label="Close button" 
              aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Esta seguro de querer borrar</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCEL</button>
              <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
            </div>`,
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}
const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};
@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.scss']
})
export class ListaEmpresasComponent implements OnInit {


  closeResult = '';
  listaEmpresas: any = [];
    constructor(private router: Router, 
    private modalService: NgbModal,
    private toastService: ToastService,
    private httpProvider : HttpProviderService) { }
  
  ngOnInit(): void {
    this.obtenerEmpresas();
  }
  async obtenerEmpresas() {
    
    this.httpProvider.getListaEmpresas().subscribe((data : any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.listaEmpresas = resultData;
        }
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.listaEmpresas = [];
            }
          }
        }
      });
  }

  AgregarEmpresa() {
    this.router.navigate(['Agregar']);
  }

   borrarEmpresaConfirmacion(employee: number) {
     this.modalService.open(MODALS['deleteModal'],
       {
         ariaLabelledBy: 'modal-basic-title'
       }).result.then((result) => {
        this.deleteEmployee(employee);
        // console.log(employee);
        
       },
         (reason) => {});
   }

   deleteEmployee(employee: number) {
     this.httpProvider.borrarEmpresa(employee).subscribe((data : any) => {
      this.toastService.show('Borrado correctamente', { classname: 'bg-warning text-light', delay: 5000 }); 
           this.obtenerEmpresas();
     },
     (error : any) => {
      console.log(error);
      
     });
   }
}
