import { getUser } from '@/lib/actions/patient.actions';
import { getPatientAppointments } from '@/lib/actions/appointment.actions';
import Image from 'next/image';
import logo from '/public/assets/icons/logo.svg';
import { Appointment } from '@/types/appwrite.types';

const DashboardPage = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params;
  const user = await getUser(userId);
  const appointments = await getPatientAppointments(userId);

  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar container my-auto'>
        <div className='sub-container max-w-[860px]'>
          <div className='mb-12 flex items-center gap-4'>
            <Image src={logo} alt='Patient Pulse' width={48} height={48} />
            <span className='text-2xl font-bold'>Patient Pulse</span>
          </div>

          <h1 className='header mb-8'>Welcome back, {user?.name}</h1>

          <div className='space-y-6'>
            <h2 className='sub-header'>Your Appointments</h2>
            {appointments?.length > 0 ? (
              <div className='grid gap-4'>
                {appointments.map((appointment: Appointment) => (
                  <div key={appointment.$id} className='rounded-lg border border-dark-400 p-4'>
                    <div className='flex justify-between'>
                      <p>Dr. {appointment.primaryPhysician}</p>
                      <span
                        className={`capitalize ${
                          appointment.status === 'pending'
                            ? 'text-yellow-500'
                            : appointment.status === 'scheduled'
                              ? 'text-green-500'
                              : 'text-red-500'
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                    <p className='text-dark-600'>{appointment.reason}</p>
                    <p className='text-sm text-dark-500'>
                      {new Date(appointment.schedule).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No appointments found.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
