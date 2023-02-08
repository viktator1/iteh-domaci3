import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OsobaService {

  constructor(private _http: HttpClient) { }

  dodajOsobu(osoba: any) {
    return this._http.post('http://localhost:8000/peoples', osoba)
  }
}
