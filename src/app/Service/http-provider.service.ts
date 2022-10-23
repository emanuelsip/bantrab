import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var urlBase = "https://apitest-bt.herokuapp.com/api/v1/empresas";

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  public getListaEmpresas(): Observable<any> {
    return this.webApiService.get(urlBase);
  }
  public putInfoEmpresas(model: any,id: number): Observable<any> {
    return this.webApiService.put(urlBase + "/" + id,model);
  }
  public getInfoEmpresas(id: number): Observable<any> {
    return this.webApiService.get(urlBase + "/" + id);
  }
  public postGuardaEmpresa(model: any): Observable<any> {
    return this.webApiService.post(urlBase, model);
  }  
  public borrarEmpresa(id: number): Observable<any> {
    return this.webApiService.delete(urlBase + "/" + id);
  }

}
