import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class ReportProblemService {
  private _http = inject(HttpClient);

  getReportProblem() {
    return this._http.get(environment.api_url + '/feedback/getfeed');
  }

  getBooking(id_booking: number) {
    return this._http.get(environment.api_url + '/books/get-book-idbook/' + id_booking);
  }

  updateStatus(requestBody: any): Observable<any>{
    return this._http.post(environment.api_url + '/feedback/update-status', requestBody);
  }

}
