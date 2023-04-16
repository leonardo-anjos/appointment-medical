import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  providers: [PatientModule],
  exports: [AppointmentService],
})
export class AppointmentModule {}
