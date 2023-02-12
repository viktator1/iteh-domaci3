import { UserData } from './../osobe-tabela/osobe-tabela.component';
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
  dohvatiOsobe() {
    return this._http.get<UserData[]>('http://localhost:8000/peoples')
  }
  izbrisiOsobu(id: number) {
    return this._http.delete(`http://localhost:8000/peoples/${id}`)
  }
  editOsobe(osoba: UserData) {
    console.log("OSOBA", osoba)
    return this._http.put(`http://localhost:8000/peoples/${osoba.id}`, osoba)
  }
}
