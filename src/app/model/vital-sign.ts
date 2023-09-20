import { Patient } from "./patient";

export class VitalSign{
    idVitalSign:number;
    patient:Patient;
    date:Date;
    temperature:number;
    pulse:number;
    respiratoryRate:number;
}