import { Injectable } from '@nestjs/common';
import { AppointmentInput } from './appointment.interface';

@Injectable()
export class AppointmentService {
  public scheduleAppointment(appointmentData: AppointmentInput) {
    return {
      ...appointmentData,
      confirmed: false,
    };
  }
}
