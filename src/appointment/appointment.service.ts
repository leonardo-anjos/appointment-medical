import { Injectable } from '@nestjs/common';
import { AppointmentInput } from './appointment.interface';

@Injectable()
export class AppointmentService {
  public scheduleAppointment(appointmentData: AppointmentInput) {
    if (appointmentData.endTime <= appointmentData.startTime) {
      throw new Error(`appointment's endTime should be after startTime`);
    }

    return {
      ...appointmentData,
      confirmed: false,
    };
  }
}
