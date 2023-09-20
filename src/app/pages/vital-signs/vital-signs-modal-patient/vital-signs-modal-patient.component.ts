import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vital-signs-modal-patient',
  templateUrl: './vital-signs-modal-patient.component.html',
  styleUrls: ['./vital-signs-modal-patient.component.css']
})
export class VitalSignsModalPatientComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<VitalSignsModalPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  ngOnInit() {
    console.log('Datos recibidos en el modal:', this.data);
  }

  closeModalEmiter(value){
    
    if(value.closeModal){
      this.dialogRef.close(value);
    }

  }
}
