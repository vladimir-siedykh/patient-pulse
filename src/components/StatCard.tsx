import clsx from 'clsx';
import Image from 'next/image';

interface StatCardProps {
  type: 'appointments' | 'pending' | 'canceled';
  count: number;
  label: string;
  icon: string;
}

const StatCard = ({ type, count = 0, label, icon }: StatCardProps) => {
  return (
    <div
      className={clsx('stat-card', {
        'bg-appointments': type === 'appointments',
        'bg-pending': type === 'pending',
        'bg-canceled': type === 'canceled',
      })}
    >
      <div className='flex items-center gap-4'>
        <Image src={icon} alt={type} width={32} height={32} className='size-8 w-fit' />
        <h2 className='text-32-bold text-white'>{count}</h2>
      </div>
      <p className='text-14-regular'>{label}</p>
    </div>
  );
};

export default StatCard;
