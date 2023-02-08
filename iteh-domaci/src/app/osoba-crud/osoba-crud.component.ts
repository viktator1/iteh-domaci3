import { OsobaService } from './../service/osoba.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { error } from 'console';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-osoba-crud',
  templateUrl: './osoba-crud.component.html',
  styleUrls: ['./osoba-crud.component.scss']
})
export class OsobaCrudComponent implements OnInit {

  osobaForma: FormGroup

  constructor(private _fb: FormBuilder, private _osobaService: OsobaService, private _dialogRef: MatDialogRef<OsobaCrudComponent>) {
    this.osobaForma = this._fb.group({
      ime: '',
      prezime: '',
      godine: 0,
      jmbg: ''
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.osobaForma.valid) {
      console.log(this.osobaForma.value)
      this._osobaService.dodajOsobu(this.osobaForma.value).subscribe({
        next: (value) => {
          alert("Uspesno dodavanje ")
          this._dialogRef.close()
        },
        error: (err) => {
          console.log("GRESKA")
        }
      })
    }
  }

}
