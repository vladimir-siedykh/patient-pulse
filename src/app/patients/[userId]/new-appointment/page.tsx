import { AppointmentForm } from '@/components/forms/AppointmentForm';
import { getPatient } from '@/lib/actions/patient.actions';
import Image from 'next/image';
import mainImg from '/public/assets/images/appointment-img.png';
import logo from '/public/assets/icons/logo.svg';

const NewAppointmentPage = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params;
  const patient = await getPatient(userId);

  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar container my-auto'>
        <div className='sub-container max-w-[860px]'>
          <div className='mb-12 flex items-center gap-4'>
            <Image src={logo} alt='Patient Pulse' width={48} height={48} />
            <span className='text-2xl font-bold'>Patient Pulse</span>
          </div>

          <AppointmentForm patientId={patient?.$id} userId={userId} type='create' />

          <p className='copyright py-12'>© {new Date().getFullYear()} Patient Pulse</p>
        </div>
      </section>

      <Image src={mainImg} alt='Patient Pulse' className='h-full w-1/4 object-cover' />
    </div>
  );
};

export default NewAppointmentPage;
