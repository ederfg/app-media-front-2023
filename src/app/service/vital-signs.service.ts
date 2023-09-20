import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { VitalSign } from '../model/vital-sign';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class VitalSignsService extends GenericService<VitalSign>{

  private VitalSignChange: Subject<VitalSign[]> = new Subject<VitalSign[]>
  private messageChange: Subject<string> = new Subject<string>
  
  constructor(protected override http: HttpClient){
    super(http, `${environment.HOST}/vital-sign`);
  }

  listPageable(p: number, s: number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  ///////////////////////////////////
  getVitalSignChange(){
    return this.VitalSignChange.asObservable();
  }

  setVitalSignChange(data: VitalSign[]){
    this.VitalSignChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }

  setMessageChange(data: string){
    this.messageChange.next(data);
  }

}
