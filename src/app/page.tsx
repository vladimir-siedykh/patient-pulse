import Image from 'next/image';
import logo from '/public/assets/icons/logo.svg';
import mainImg from '/public/assets/images/onboarding-img.png';
import PatientForm from '@/components/forms/PatientForm';
import Link from 'next/link';

export default async function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === 'true';

  return (
    <div className='flex h-screen max-h-screen'>
      {/* TODO: OTP verification */}
      <section className='remove-scrollbar container my-auto'>
        <div className='sub-container max-w-[496px]'>
          <div className='mb-12 flex items-center gap-4'>
            <Image src={logo} alt='Patient Pulse' width={48} height={48} />
            <span className='text-2xl font-bold'>Patient Pulse</span>
          </div>

          <PatientForm />

          <div className='text-14-regular mt-20 flex justify-between'>
            <p className='justify-items-end text-dark-600 xl:text-left'>
              © {new Date().getFullYear()} Patient Pulse
            </p>
            <Link href='/?admin-true' className='text-green-500'>
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image src={mainImg} alt='Patient Pulse' className='h-full w-1/2 object-cover' />
    </div>
  );
}
