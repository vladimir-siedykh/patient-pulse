import Image from 'next/image';
import logo from '/public/assets/icons/logo.svg';
import mainImg from '/public/assets/images/register-img.png';
import RegisterForm from '@/components/forms/RegisterForm';
import { getUser } from '@/lib/actions/patient.actions';

import * as Sentry from '@sentry/nextjs';

const RegistrationPage = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params;
  const user = await getUser(userId);

  Sentry.metrics.set('user_view_register', user.name);

  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar container my-auto'>
        <div className='sub-container max-w-[860px]'>
          <div className='mb-12 flex items-center gap-4'>
            <Image src={logo} alt='Patient Pulse' width={48} height={48} />
            <span className='text-2xl font-bold'>Patient Pulse</span>
          </div>

          <RegisterForm user={user} />

          <p className='copyright py-12'>© {new Date().getFullYear()} Patient Pulse</p>
        </div>
      </section>

      <Image src={mainImg} alt='Patient Pulse' className='max-w-[300px] h-full object-cover' />
    </div>
  );
};

export default RegistrationPage;
