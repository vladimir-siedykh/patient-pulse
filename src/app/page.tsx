import Image from 'next/image';
import logo from '/public/assets/icons/logo.svg';
import Link from 'next/link';
export default function Home() {
  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar container my-auto'>
        <div className='sub-container max-w-[496px]'>
          <Link href='/' className='flex items-center gap-2'>
            <Image src={logo} alt='Patient Pulse' width={48} height={48} />
            <h1 className='text-2xl font-bold'>Patient Pulse</h1>
          </Link>
        </div>
      </section>
    </div>
  );
}
