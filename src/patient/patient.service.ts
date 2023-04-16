import { Injectable } from '@nestjs/common';
import { PatientInput } from './patient.interface';
import { Patient } from './patient.model';

@Injectable()
export class PatientService {
  private readonly patients: Patient[] = [];

  public async register(patientInput: PatientInput): Promise<Patient> {
    const newPatient = {
      id: 1,
      name: patientInput.name,
    };

    this.patients.push(newPatient);

    return newPatient;
  }

  public async doesPatientExist(patientId: number): Promise<boolean> {
    return false;
  }
}
