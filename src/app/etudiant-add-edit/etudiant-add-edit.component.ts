import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EtudiantService } from '../services/etudiant.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-etudiant-add-edit',
  templateUrl: './etudiant-add-edit.component.html',
  styleUrls: ['./etudiant-add-edit.component.scss']
})
export class EtudiantAddEditComponent implements OnInit {
  empForm: FormGroup;


  constructor(private _fb: FormBuilder, private _etudiantService: EtudiantService, private _dialogRef: DialogRef<EtudiantAddEditComponent>,@Inject(MAT_DIALOG_DATA) public data:any ){
    this.empForm = this._fb.group({
      prenom: '',
      nom: '',
      classe: '',
      sexe: '',
    })
}

ngOnInit(): void {
  this.empForm.value.patchValue(this.data);
}
onFormSubmit(){
  if(this.empForm.valid){ 
    if(this.data){
      this._etudiantService.UpdateEtudiant(this.data.id, this.empForm.value).subscribe({
        next: (val: any) => {
          alert('INFORMATIONS ETUDIANT MODIFIE');
          this._dialogRef.close();
        },
        error: (err:any) => {
          console.error(err);
        },
    });
  }


    }else{
      this._etudiantService.AddEtudiant(this.empForm.value).subscribe({
        next: (val: any) => {
          alert('ETUDIANT AJOUTER AVEC SUCCES');
          this._dialogRef.close();
        },
        error: (err:any) => {
          console.error(err);
        },
    });
  }
    
   this._etudiantService.AddEtudiant(this.empForm.value).subscribe({
      next: (val: any) => {
        alert('ETUDIANT AJOUTER AVEC SUCCES');
        this._dialogRef.close();
      },
      error: (err:any) => {
        console.error(err);
      },
  });
};


}
