import { Injectable } from '@nestjs/common';

@Injectable()
export class PatientService {
  async register(patientInput: any): Promise<any> {
    return {
      id: 1,
      name: patientInput.name,
    };
  }
}
