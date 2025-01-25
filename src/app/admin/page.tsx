import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/assets/icons/logo.svg';
import StatCard from '@/components/StatCard';
import AppointmentIcon from '/public/assets/icons/appointments.svg';
import PendingIcon from '/public/assets/icons/pending.svg';
import CanceledIcon from '/public/assets/icons/canceled.svg';
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions';
import { DataTable } from '@/components/table/DataTable';
import { columns } from '@/components/table/columns';

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();

  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
      <header className='admin-header'>
        <Link href='/' className='cursor-pointer'>
          <div className='flex items-center gap-4'>
            <Image src={logo} alt='Patient Pulse' width={32} height={32} />
            <span className='text-xl font-bold'>Patient Pulse</span>
          </div>
        </Link>
        <p className='text-16-bold'>Admin dashboard</p>
      </header>

      <main className='admin-main'>
        <section className='w-full space-y-4'>
          <h1 className='header'>Welcome 👋</h1>
          <p className='text-dark-700'>
            This is the admin dashboard for Patient Pulse. Here you can manage your patients,
            requests, and settings.
          </p>
        </section>
        <section className='admin-stat'>
          <StatCard
            type='appointments'
            count={appointments.scheduledCount}
            label='Scheduled appointments'
            icon={AppointmentIcon}
          />
          <StatCard
            type='pending'
            count={appointments.pendingCount}
            label='Pending appointments'
            icon={PendingIcon}
          />
          <StatCard
            type='canceled'
            count={appointments.canceledCount}
            label='Canceled appointments'
            icon={CanceledIcon}
          />
        </section>
        <DataTable data={appointments.documents} columns={columns} />
      </main>
    </div>
  );
};

export default AdminPage;
