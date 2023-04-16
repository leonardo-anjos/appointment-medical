import { Injectable } from '@nestjs/common';
import { AppointmentInput } from './appointment.interface';

@Injectable()
export class AppointmentService {
  public scheduleAppointment(appointmentData: AppointmentInput) {
    if (appointmentData.endTime <= appointmentData.startTime) {
      throw new Error(`appointment's endTime should be after startTime`);
    }

    if (
      appointmentData.endTime.getUTCDate() !==
      appointmentData.startTime.getUTCDate()
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
