import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EtudiantAddEditComponent } from './etudiant-add-edit/etudiant-add-edit.component';
import { EtudiantService } from './services/etudiant.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
 title = 'crud-etudiant';
  displayedColumns: string[] = ['prenom', 'nom', 'classe', 'sexe', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _etudiantService: EtudiantService){}

  ngOnInit(): void {
    this.getEtudiantList();
  }
  openAddEditEmpForm(){
   this._dialog.open(EtudiantAddEditComponent);

  }

  getEtudiantList(){
    this._etudiantService.getEtudiantList().subscribe({
      next: (res)=> {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort= this.sort;
          this.dataSource.paginator= this.paginator;
      },
      error: console.log,
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  deleteEtudiant(id:number){
    this._etudiantService.deleteEtudiant(id).subscribe({
        next: (res)=> {
          alert('Etudiant(e) Supprimé(e) !');
        },
        error: console.log,

    })
  }

  openEditForm(data: any){
    this._dialog.open(EtudiantAddEditComponent, {
      data,
    });
 
   }

}
