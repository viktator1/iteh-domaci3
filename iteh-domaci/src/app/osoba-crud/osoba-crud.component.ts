import { UserData } from './../osobe-tabela/osobe-tabela.component';
import { OsobaService } from './../service/osoba.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-osoba-crud',
  templateUrl: './osoba-crud.component.html',
  styleUrls: ['./osoba-crud.component.scss']
})
export class OsobaCrudComponent implements OnInit {

  osobaForma: FormGroup

  constructor(private _fb: FormBuilder, private _osobaService: OsobaService, private _dialogRef: MatDialogRef<OsobaCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public osoba: UserData) {
    this.osobaForma = this._fb.group({
      id: 0,
      ime: '',
      prezime: '',
      godine: 0,
      jmbg: ''
    })
  }

  ngOnInit(): void {
    this.osobaForma.patchValue(this.osoba)
  }

  onSubmit() {
    if (this.osobaForma.valid) {
      if (this.osoba) {
        this._osobaService.editOsobe(this.osobaForma.value).subscribe({
          next: (value) => {
            alert("Uspesna izmena")
            this._dialogRef.close()
          },
          error: (err) => {
            console.log("GRESKA: ", err)
          }
        })
      } else {
        this._osobaService.dodajOsobu(this.osobaForma.value).subscribe({
          next: (value) => {
            alert("Uspesno dodavanje ")
            this._dialogRef.close()
          },
          error: (err) => {
            console.log("GRESKA: ", err)
          }
        })
      }
    }
  }

}
