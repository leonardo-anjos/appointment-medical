import { Injectable } from '@nestjs/common';
import { PatientInput } from './patient.interface';
import { Patient } from './patient.model';

@Injectable()
export class PatientService {
  private readonly patients: Patient[] = [];

  // added a private counter
  private nextId = 1;

  public async register(patientInput: PatientInput): Promise<Patient> {
    const newPatient = {
      // now we use this new counter and increase it in every call
      id: this.nextId++,
      name: patientInput.name,
    };

    this.patients.push(newPatient);

    return newPatient;
  }

  public async doesPatientExist(patientId: number): Promise<boolean> {
    return this.patients.some((patient) => patient.id === patientId);
  }
}
