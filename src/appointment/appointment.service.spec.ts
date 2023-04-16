import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';
import { PatientService } from 'src/patient/patient.service';
import { PatientModule } from 'src/patient/patient.module';

describe('AppointmentService', () => {
  let service: AppointmentService;
  let patientService: PatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PatientModule],
      providers: [AppointmentService],
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
    patientService = module.get(PatientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // 1. An unconfirmed schedule should be created on success
  // 2. The end time should not be before the start time
  // 3. The end time should be after the start time
  // 4. An appointment start and end time should be within the same day (NEW)
  // 5. The patientId should be validated?

  it('should schedule an unconfirmed appointment for a user on success', () => {
    const startTime = new Date('2023-05-01T14:00:00Z');
    const endTime = new Date('2023-05-01T15:00:00Z');

    const newAppointment = service.scheduleAppointment({
      patientId: 1,
      startTime,
      endTime,
    });

    expect(newAppointment).toEqual({
      patientId: 1,
      startTime,
      endTime,
      confirmed: false,
    });
  });

  it('should throw an error when and time is before start time', () => {
    const startTime = new Date('2023-05-15T08:00:00Z');
    const endTime = new Date('2023-04-15T08:00:00Z');

    expect(() =>
      service.scheduleAppointment({
        patientId: 1,
        startTime,
        endTime,
      }),
    ).toThrowError(`appointment's endTime should be after startTime`);
  });

  it('should throw an error when end time is equal to start time', () => {
    const startTime = new Date('2023-05-15T08:00:00Z');
    const endTime = startTime;

    expect(() =>
      service.scheduleAppointment({
        patientId: 1,
        startTime,
        endTime,
      }),
    ).toThrowError(`appointment's endTime should be after startTime`);
  });

  it('should throw an error when end time is in the next day', () => {
    const startTime = new Date('2023-05-15T08:00:00Z');
    const endTime = new Date('2023-05-16T08:00:00Z');

    expect(() =>
      service.scheduleAppointment({
        patientId: 1,
        startTime,
        endTime,
      }),
    ).toThrowError(`appointment's endTime should be in the same day as start time's`);
  });

  it('should throw an error when end time is in same day and hour of next month', () => {
    const startTime = new Date('2023-04-01T14:00:00Z');
    const endTime = new Date('2023-05-01T14:00:00Z');

    expect(() =>
      service.scheduleAppointment({
        patientId: 1,
        startTime,
        endTime,
      }),
    ).toThrowError(
      `appointment's endTime should be in the same day as start time's`,
    );
  });

  it('should throw an error when end time is in same day, hour and month of the next year', () => {
    const startTime = new Date('2023-05-01T14:00:00Z');
    const endTime = new Date('2024-05-01T14:00:00Z');

    expect(() =>
      service.scheduleAppointment({
        patientId: 1,
        startTime,
        endTime,
      }),
    ).toThrowError(
      `appointment's endTime should be in the same day as start time's`,
    );
  });

  describe('integrating PatientModule with AppointmentModule', () => {
    it('should schedule an unconfirmed appointment for a user on success', async () => {
      const startTime = new Date('2023-05-01T14:00:00Z');
      const endTime = new Date('2023-05-01T15:00:00Z');

      const newAppointment = service.scheduleAppointment({
        patientId: 1,
        startTime,
        endTime,
      });

      expect(newAppointment).toEqual({
        patientId: 1,
        startTime,
        endTime,
        confirmed: false,
      });
    });
  });
});
