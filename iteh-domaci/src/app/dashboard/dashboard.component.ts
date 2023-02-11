import { OsobaService } from './../service/osoba.service';
import { OsobaCrudComponent } from './../osoba-crud/osoba-crud.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  osobe: any

  constructor(private _dialog: MatDialog, private _osobaService: OsobaService) { }

  ngOnInit(): void {
    this.dohvatiOsobe()
  }

  otvoriOsobaFormu() {
    this._dialog.open(OsobaCrudComponent, {
      width: '30%',
    })
  }

  dohvatiOsobe() {
    this._osobaService.dohvatiOsobe().subscribe({
      next: (res) => {
        console.log("DOHVATANJE: ", res)
        this.osobe = res
      },
      error: console.log,
    })
  }

}
