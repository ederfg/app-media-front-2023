import { switchMap } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VitalSign } from 'src/app/model/vital-sign';
import { VitalSignsService } from 'src/app/service/vital-signs.service';
import { Patient } from 'src/app/model/patient';
import { MatDialog } from '@angular/material/dialog';
import { PatientEditComponent } from '../patient/patient-edit/patient-edit.component';

@Component({
  selector: 'app-vital-signs',
  templateUrl: './vital-signs.component.html',
  styleUrls: ['./vital-signs.component.css']
})
export class VitalSignsComponent implements OnInit {


  displayedColumns: string[] = ['id', 'patient', 'date', 'temperature', 'pulse', 'respiratoryRate','actions']
  dataSource: MatTableDataSource<VitalSign>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  totalElements: number = 0;

  constructor(
    private vitalSignService: VitalSignsService,
    private _snackBar: MatSnackBar,

  ) {

  }

  ngOnInit(): void {
    this.vitalSignService.getVitalSignChange().subscribe(data => {
      console.log(data)
      this.createTable(data);
    });

    this.vitalSignService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, 'INFO', { duration: 2000, horizontalPosition: 'right', verticalPosition: 'top' });
    });

    this.vitalSignService.listPageable(0, 2).subscribe(data => {
      this.totalElements = data.totalElements;
      this.createTable(data.content);
    });
  }

  createTable(data: VitalSign[]) {
    this.dataSource = new MatTableDataSource(data);

    // Aducuamos el filtro para la entidad "paciente"
    this.dataSource.filterPredicate = (data: VitalSign, filter: string) => {
      const atributoFiltrable = data.patient.firstName.toLowerCase() + ' ' + data.patient.lastName.toLowerCase();
      const filtroEnMinusculas = filter.toLowerCase();
      return atributoFiltrable.includes(filtroEnMinusculas);
    };
  }

  delete(idVitalSign: number) {
    this.vitalSignService.delete(idVitalSign)
      .pipe(switchMap(() => this.vitalSignService.findAll()))
      .subscribe(data => {
        this.createTable(data);
        this.vitalSignService.setMessageChange('DELETED!');
      });
  }

  applyFilter(e: any) {
    console.log(e)
    this.dataSource.filter = e.target.value.trim();
  }

  showMore(e: any) {
    this.vitalSignService.listPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.totalElements = data.totalElements;
      this.createTable(data.content);
    });
  }


}
