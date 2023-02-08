import { OsobaCrudComponent } from './../osoba-crud/osoba-crud.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _dialog: MatDialog) { }

  ngOnInit(): void {
  }

  otvoriOsobaFormu() {
    this._dialog.open(OsobaCrudComponent, {
      width: '30%',
    })
  }

}
