import { OsobeTabelaComponent } from './../osobe-tabela/osobe-tabela.component';
import { OsobaService } from './../service/osoba.service';
import { OsobaCrudComponent } from './../osoba-crud/osoba-crud.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  osobe: any

  constructor(private _dialog: MatDialog, private _osobaService: OsobaService) { }

  @ViewChild(OsobeTabelaComponent, { static: false }) tabela!: OsobeTabelaComponent

  ngOnInit(): void {
    this.dohvatiOsobe()
  }

  otvoriOsobaFormu() {
    const dialog = this._dialog.open(OsobaCrudComponent, {
      width: '30%',
    })
    dialog.afterClosed().subscribe({
      next: (val) => {
        this.tabela.postaviTabelu()
      }
    })
  }

  dohvatiOsobe() {
    this._osobaService.dohvatiOsobe().subscribe({
      next: (res) => {
        this.osobe = res
      },
      error: console.log,
    })
  }

  test(e: Event) {
    console.log(e)
    this.tabela.postaviTabelu()
  }

}
