import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from './../../../service/patient.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Patient } from 'src/app/model/patient';
import { VitalSignsService } from 'src/app/service/vital-signs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VitalSign } from 'src/app/model/vital-sign';
import { switchMap } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { PatientEditComponent } from '../../patient/patient-edit/patient-edit.component';
import { VitalSignsModalPatientComponent } from '../vital-signs-modal-patient/vital-signs-modal-patient.component';

@Component({
  selector: 'app-vital-signs-edit',
  templateUrl: './vital-signs-edit.component.html',
  styleUrls: ['./vital-signs-edit.component.css']
})
export class VitalSignsEditComponent implements OnInit {


  listPatient: Patient[]=[]

  form: FormGroup;
  id: number;
  isEdit: boolean;

  constructor(
    private vitalSignService: VitalSignsService,
    private patientService:PatientService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ){

    this.patientService.findAll().subscribe( res=>{
      this.listPatient = res; 
    })
    
  }

  ngOnInit(): void {

    this.patientService.getPatientChange().subscribe( res=>{
      this.listPatient = res
    } )

    /*this.patientService.findAll().subscribe( res=>{
      this.listPatient = res; 
    })*/
  
    this.form = new FormGroup({
      idVitalSign: new FormControl(0),
      patient: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      temperature: new FormControl('',[Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      pulse: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0)]),
      respiratoryRate: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0)]),
       
    });

    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
     this.initForm();
    });

  }

  get f(){
    return this.form.controls;
  }

  
  initForm() {
    if (this.isEdit) {
      this.vitalSignService.findById(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idVitalSign: new FormControl(data.idVitalSign),
          patient: new FormControl(data.patient, [Validators.required]),
          date: new FormControl(data.date,[Validators.required]),
          temperature: new FormControl(data.temperature, [Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
          pulse: new FormControl(data.pulse, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0)]),
          respiratoryRate: new FormControl(data.respiratoryRate, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0)]),
        });
      });
    }
  }

displayFn(item: Patient): string {
  return item ? (item. firstName+' '+item.lastName) : '';
}
  
  operate() {
    const vitalSign: VitalSign = new VitalSign();
    vitalSign.idVitalSign = this.form.value['idVitalSign'];
    vitalSign.patient = this.form.value['patient'];
    vitalSign.date = this.form.value['date'];  
    vitalSign.temperature = this.form.value['temperature'];  
    vitalSign.pulse= this.form.value['pulse'];  
    vitalSign.respiratoryRate= this.form.value['respiratoryRate'];  

    if (this.isEdit) {
      //UPDATE
      //NO IDEAL - PRACTICA COMUN
      this.vitalSignService.update(this.id, vitalSign)
      .pipe(switchMap( () => {
        return this.vitalSignService.findAll();
      }))
      
      .subscribe((data) => {
        this.vitalSignService.setVitalSignChange(data);
        this.vitalSignService.setMessageChange('UPDATED!');
      });
    } else {
      //INSERT
      //IDEAL - PRACTICA RECOMENDADA
      this.vitalSignService.save(vitalSign).pipe(switchMap( () => {
        return this.vitalSignService.findAll();
      }))
      .subscribe(data => {
        this.vitalSignService.setVitalSignChange(data);
        this.vitalSignService.setMessageChange('INSERTED!');
      });
    } 
    this.router.navigate(['/pages/signs'])
  }
  
  openDialog(): void {

    let dataModal:any ={};
    dataModal.typeAction =   (this.isEdit)?'update':'new'
    dataModal.id = (this.isEdit)?this.id:null;

    const dialogRef = this.dialog.open(VitalSignsModalPatientComponent, {
      data: dataModal,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.newIdPatient){
        let newPatient:Patient = this.listPatient.find( element=>element.idPatient===result.newIdPatient);
          this.form.patchValue({
            'patient':newPatient
          })
      }
    });
  }


}
