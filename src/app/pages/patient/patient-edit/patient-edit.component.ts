import { Component, OnInit,Input , Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css'],
})
export class PatientEditComponent implements OnInit {
  form: FormGroup;
  id: number;
  isEdit: boolean;

  @Input() isModal: boolean=false;
  @Input() dataModal: any={};

  @Output() emiterCloseModal: EventEmitter<any> = new EventEmitter();

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      idPatient: new FormControl(0),
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      dni: new FormControl('',[Validators.required, Validators.minLength(8)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(9)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.isEdit) {
      this.patientService.findById(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idPatient: new FormControl(data.idPatient),
          firstName: new FormControl(data.firstName, [Validators.required, Validators.minLength(3)]),
          lastName: new FormControl(data.lastName,[Validators.required, Validators.minLength(3)]),
          dni: new FormControl(data.dni, [Validators.required, Validators.minLength(8)]),
          address: new FormControl(data.address, [Validators.required, Validators.maxLength(150)]),
          phone: new FormControl(data.phone, [Validators.required, Validators.minLength(9)]),
          email: new FormControl(data.email, [Validators.required, Validators.email]),
        });
      });
    }
  }

  get f(){
    return this.form.controls;
  }

  operate() {
    const patient: Patient = new Patient();
    patient.idPatient = this.form.value['idPatient'];
    patient.firstName = this.form.value['firstName'];
    patient.lastName = this.form.value['lastName'];
    patient.dni = this.form.value['dni'];
    patient.address = this.form.value['address'];
    patient.phone = this.form.value['phone'];
    patient.email = this.form.value['email'];

    if (this.isEdit) {
      //UPDATE
      //NO IDEAL - PRACTICA COMUN
      this.patientService.update(this.id, patient).subscribe((dataUpd:Patient) => {

        if(dataUpd.idPatient!==null){
          this.evaluateRouterRedirect();
        }

        this.patientService.findAll().subscribe(data => {
          this.patientService.setPatientChange(data);
          this.patientService.setMessageChange('UPDATED!'); 
        });
      });
    } else {
      //INSERT
      //IDEAL - PRACTICA RECOMENDADA
      this.patientService.save(patient).pipe(switchMap( (dataNew) => {
        console.log(dataNew)
       
          this.evaluateRouterRedirect(dataNew.idPatient);
        

        return this.patientService.findAll();
      }))
      .subscribe(data => {
        this.patientService.setPatientChange(data);
        this.patientService.setMessageChange('INSERTED!');
      });
    }
  // this.evaluateRouterRedirect();
  }

  cancel(){
    this.evaluateRouterRedirect();
  }

  evaluateRouterRedirect(idPatient?:number){
    if(this.isModal){
      console.log(this.dataModal)
      if(this.dataModal.typeAction==='new'){
        this.router.navigate(['/pages/signs/new']) 
      } else if(this.dataModal.typeAction==='update'){
        this.router.navigate(['/pages/signs/edit/'+this.dataModal.id])
      } 
      this.emitCloseModal(idPatient); 
    }else{
      this.router.navigate(['/pages/patient'])
    }
  }

  emitCloseModal(idPatient:number){
    let data:any = {}
    data.closeModal = true;
    data.newIdPatient = idPatient;
    this.emiterCloseModal.emit(data);
  }
}