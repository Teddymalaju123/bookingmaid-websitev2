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
    return this._http.delete(environment.api_url + '/user/delete/' + id_user);
  }

  editUser(selectedUserid: number,formData: any): Observable<any> {
    return this._http.post(environment.api_url + '/user/edit/'  + selectedUserid,formData);
  }

  getBookResident(id_user: number): Observable<any> {
    return this._http.get(environment.api_url + '/books/get-book-idresident/'  + id_user);
  }

  
}
