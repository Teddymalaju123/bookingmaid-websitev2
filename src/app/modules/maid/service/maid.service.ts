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
    return this._http.post(environment.api_url + '/user/save'+ id_worktime,formData);
  }

  // deleteMaidTime(id_worktime: number): Observable<any> {
  //   const url = `${environment.api_url}/maidwork/deletemaid/${id_worktime}`;
  //   return this._http.delete(url);
  // }

  deleteMaidTime(id_worktime: number): Observable<any> {
    return this._http.delete(environment.api_url + '/maidwork/deletemaid/' + id_worktime);
  }

  getMaidById() {
    return this._http.get(environment.api_url + '/maidwork/getwork');
  }
}


