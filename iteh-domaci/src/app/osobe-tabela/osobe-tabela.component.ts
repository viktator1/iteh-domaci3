import { OsobaService } from './../service/osoba.service';
import { AfterViewInit, Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  id: string;
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
  displayedColumns: string[] = ['id', 'ime', 'prezime', 'godine', 'jmbg'];
  dataSource!: MatTableDataSource<UserData>;
  osobe!: UserData[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _osobaService: OsobaService) {

    _osobaService.dohvatiOsobe().subscribe({
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
}