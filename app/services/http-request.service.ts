import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  contactUrl: string = 'https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/contacts';

  companyUrl: string = 'https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/companies';

  constructor(private http: HttpClient) { }

  getAllContacts(): Observable<any> {
    return this.http.get(this.contactUrl);
  }

  getAllCompanies(): Observable<any> {
    return this.http.get(this.companyUrl);
  }
}
