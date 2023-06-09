import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from './patient.service';

describe('PatientService', () => {
  let service: PatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientService],
    }).compile();

    service = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // 1. The patientId should be validated?
  // 2. We should be able to register a patient.
  // 3. We should be able to say when a patient exists.

  describe('register', () => {
    it('should return a new patient with given name', async () => {
      const newPatient = await service.register({ name: 'Leonardo Anjos' });

      expect(newPatient).toEqual({
        id: expect.any(Number),
        name: 'Leonardo Anjos',
      });
    });
  });

  // 1. We should be able to say when a patient exists.
  // 2. We should be able to register a patient.
  // 3. The patientId should be validated.

  describe('does patient exist', () => {
    it('should return false when no patient was registered', async () => {
      const patientId = 1;
      const patientExist = await service.doesPatientExist(patientId);

      expect(patientExist).toBe(false);
    });

    it('should return true when patient was registered', async () => {
      const { id: patientId } = await service.register({ name: 'Leonardo Anjos' });
      const exists = await service.doesPatientExist(patientId);

      expect(exists).toBe(true);
    });

    it('should return different ids when called twice with the same name', async () => {
      const firstPatient = await service.register({ name: 'Leonardo Anjos' });
      const secondPatient = await service.register({ name: 'Leonardo Anjos' });

      expect(firstPatient).not.toEqual(secondPatient);
    });
  });
});
