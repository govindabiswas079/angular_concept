import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  selectedApimodel: any;
  apimodels: any[];
  // readonly baseURL = 'http://localhost:8080/jobs';
  readonly baseURL = 'http://localhost:8080/infouser'
  readonly ipURL = 'https://api.ipify.org/?format=json'
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { };

  postData(emp: any) {
    return this.http.post(`${this.baseURL}/ad`, emp, { headers: this.headers });
  };

  getData() {
    return this.http.get(`${this.baseURL}/getuser`, { headers: this.headers });
  };

  getById(id: any) {
    return this.http.post(`${this.baseURL}/get/${id}`, { headers: this.headers }); //this.baseURL + `getbyid/${id}`
  };

  putData(emp: any) {
    return this.http.put(`${this.baseURL}/update/${emp.Id}`, emp, { headers: this.headers }); //this.baseURL + `update/${emp.Id}`
  };

  deleteData(id: any) {
    return this.http.delete(`${this.baseURL}/delete/${id}`, { headers: this.headers }); //this.baseURL + `delete/${id}`
  };

  getIp() {
    return this.http.get(`${this.ipURL}`, { headers: this.headers });
  };

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    };
    console.log(errorMessage);
    return throwError(errorMessage);
  };
};
