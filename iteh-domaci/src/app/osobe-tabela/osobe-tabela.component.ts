import { OsobaCrudComponent } from './../osoba-crud/osoba-crud.component';
import { MatDialog } from '@angular/material/dialog';
import { OsobaService } from './../service/osoba.service';
import { AfterViewInit, Component, ViewChild, OnInit, Input, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EventEmitter } from '@angular/core';

export interface UserData {
  id: number;
  ime: string;
  prezime: string;
  godine: number;
  jmbg: string;
}



/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-osobe-tabela',
  templateUrl: './osobe-tabela.component.html',
  styleUrls: ['./osobe-tabela.component.scss']
})
export class OsobeTabelaComponent {
  displayedColumns: string[] = ['id', 'ime', 'prezime', 'godine', 'jmbg', 'akcije'];
  dataSource!: MatTableDataSource<UserData>;
  osobe!: UserData[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() editOsobe = new EventEmitter();


  constructor(private _osobaService: OsobaService, private _dialog: MatDialog) {

    this.postaviTabelu()
  }

  postaviTabelu() {
    this._osobaService.dohvatiOsobe().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  izbrisiOsobu(id: number) {
    this._osobaService.izbrisiOsobu(id).subscribe({
      next: (res) => {
        alert("Osoba je izbrisana!")
        this.postaviTabelu()
      },
      error: console.log,
    })
  }

  editOsobeClick(osoba: UserData) {
    const dialog = this._dialog.open(OsobaCrudComponent, {
      data: osoba,
      width: '30%',
    })
    dialog.afterClosed().subscribe({
      next: (val) => {
        this.editOsobe.emit(osoba)
      }
    })
  }

}