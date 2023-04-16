import { Injectable } from '@nestjs/common';
import { PatientInput } from './patient.interface';
import { Patient } from './patient.model';

@Injectable()
export class PatientService {
  async register(patientInput: PatientInput): Promise<Patient> {
    return {
      id: 1,
      name: patientInput.name,
    };
  }

  public async doesPatientExist(patientId: number): Promise<boolean> {
    return false;
  }
}
