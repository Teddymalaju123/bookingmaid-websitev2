import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResidentService {
  private _http = inject(HttpClient);

  getResident() {
    return this._http.get(environment.api_url + '/user/get-resident');
  }

  createUser(req: any, url: string): Observable<any> {
    return this._http.post(environment.api_url + '/user/save' , req);
  }

  deleteUser(id_user: number): Observable<any> {
    const url = `${environment.api_url}/user/delete/${id_user}`;
    return this._http.delete(url);
  }
  
}
