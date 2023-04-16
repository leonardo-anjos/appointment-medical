import { Injectable } from '@nestjs/common';
import { AppointmentInput } from './appointment.interface';

@Injectable()
export class AppointmentService {
  public scheduleAppointment(appointmentData: AppointmentInput) {
    if (appointmentData.endTime <= appointmentData.startTime) {
      throw new Error(`appointment's endTime should be after startTime`);
    }

    if (
      // check same hour or month but different day
      (appointmentData.endTime.getUTCDate() !== appointmentData.startTime.getUTCDate()) ||
      // check same day or hours but different month
      (appointmentData.endTime.getUTCMonth() !== appointmentData.startTime.getUTCMonth())
    ) {
      throw new Error(
        `appointment's endTime should be in the same day as start time's`,
      );
    }

    return {
      ...appointmentData,
      confirmed: false,
    };
  }
}
