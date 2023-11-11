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
    return this._http.post(environment.api_url + '/user/save', req);
  }

  saveTime(formData: any ): Observable<any> {
    return this._http.post(environment.api_url + '/maidwork/savework', formData);
  }

  editMaidTime(id_worktime: number,formData: any): Observable<any>{
    return this._http.post(environment.api_url + '/maidwork/editmaid/'+ id_worktime,formData);
  }

  deleteMaidTime(id_worktime: number): Observable<any> {
    return this._http.delete(environment.api_url + '/maidwork/deletemaid/' + id_worktime);
  }

  getMaidById() {
    return this._http.get(environment.api_url + '/maidwork/getwork');
  }

  getbyIdMaid(id_user: any): Observable<any> {
    return this._http.get(environment.api_url + '/user/get-resident/' + id_user);
  }

  getBookMaid(id_user: number): Observable<any> {
    return this._http.get(environment.api_url + '/books/get-book-idMaid/'  + id_user);
  }

}


