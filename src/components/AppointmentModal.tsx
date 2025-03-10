'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { AppointmentForm } from './forms/AppointmentForm';
import { Appointment } from '@/types/appwrite.types';

const AppointmentModal = ({
  type,
  userId,
  patientId,
  appointment,
}: {
  type: 'schedule' | 'cancel';
  userId: string;
  patientId: string;
  appointment?: Appointment;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className={`capitalize ${type === 'schedule' ? 'text-green-500' : 'text-red-500'}`}
        >
          {type === 'schedule' ? 'Schedule' : 'Cancel'}
        </Button>
      </DialogTrigger>
      <DialogContent className='shad-dialog sm:max-w-md'>
        <DialogHeader className='mb-4 space-y-3'>
          <DialogTitle className='capitalize'>{type} appointment</DialogTitle>
          <DialogDescription>
            Please confirm the following details to {type} appointment.
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
export default AppointmentModal;
