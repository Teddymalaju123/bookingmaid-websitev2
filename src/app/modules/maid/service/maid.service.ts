import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MaidService {
  [x: string]: any;
  private _http = inject(HttpClient);

  getMaid() {
    return this._http.get(environment.api_url + '/user/get-maid');
  }

  createMaid(req: any, url: string): Observable<any> {
    // Provide the URL and the request body (req)
    return this._http.post(environment.api_url + '/user/save' , req);
  }
  
  saveTime(timeData: any): Observable<any> {
    return this._http.post(environment.api_url + '/maidwork/savework', timeData);
  }

  deleteMaidTime(id_worktime: any): Observable<any>{
    return this._http.delete(environment.api_url +'/maidwork/deletemaid/:id', id_worktime);
  }
}
