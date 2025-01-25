import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { getAppointment } from '@/lib/actions/appointment.actions';
import { formatDateTime } from '@/lib/utils';

import logo from '/public/assets/icons/logo.svg';

import * as Sentry from '@sentry/nextjs';

const RequestSuccessPage = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{ appointmentId?: string }>;
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const { appointmentId } = await searchParams;

  const appointment = await getAppointment(appointmentId || '');
  const doctor = Doctors.find((doctor) => doctor.name === appointment.primaryPhysician);

  Sentry.metrics.set('user_view_success', appointment.patientId);

  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
      <div className='success-img'>
        <Link href='/'>
          <div className='flex items-center gap-4'>
            <Image src={logo} alt='Patient Pulse' width={48} height={48} />
            <span className='text-2xl font-bold'>Patient Pulse</span>
          </div>
        </Link>

        <section className='flex flex-col items-center'>
          <h2 className='header mb-6 mt-10 max-w-[600px] text-center'>
            Your <span className='text-green-500'>appointment request</span> has been successfully
            submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className='request-details'>
          <p>Requested appointment details: </p>
          <div className='flex items-center gap-3'>
            <Image
              src={doctor?.image || '/assets/icons/user.svg'}
              alt='doctor'
              width={100}
              height={100}
              className='size-6'
            />
            <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
          </div>
          <div className='flex gap-2'>
            <Image src='/assets/icons/calendar.svg' height={24} width={24} alt='calendar' />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        {/* <Button variant='outline' className='shad-primary-btn' asChild>
          <Link href={`/patients/${userId}/new-appointment`}>New Appointment</Link>
        </Button> */}
        <div className='flex gap-4'>
          <Button variant='outline' className='shad-primary-btn' asChild>
            <Link href={`/patients/${userId}/new-appointment`}>New appointment</Link>
          </Button>
          <Button className='shad-primary-btn' asChild>
            <Link href={`/patients/${userId}/dashboard`}>View appointments</Link>
          </Button>
        </div>

        <p className='copyright'>© {new Date().getFullYear()} Patient Pulse</p>
      </div>
    </div>
  );
};

export default RequestSuccessPage;
