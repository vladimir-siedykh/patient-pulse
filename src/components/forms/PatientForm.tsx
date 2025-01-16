'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import CustomFormField from '../CustomFormField';
import SubmitDutton from '../SubmitDutton';
import { useState } from 'react';
import { PatientFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';

export enum FormFieldType {
  INPUT = 'input',
  CHECKBOX = 'checkbox',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
}

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({name, email, phone}: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);
    try {
      // const userDate = {
      //   name,
      //   email,
      //   phone,
      // };

      // const user = await createUser(userDate);
      // if (user) {
      //   router.push(`/patient/${user.id}/register`);
      // }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex-1 space-y-6'>
        <section className='mb-12 space-y-4'>
          <h1 className='header'>Hi there 👋</h1>
          <p className='text-dark-700'>Schedule your first appointment with us</p>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name='name'
          label='Full name'
          placeholder='Alexander Smith'
          iconSrc='/assets/icons/user.svg'
          iconAlt='user icon'
          autoComplete='name'
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name='email'
          label='Email'
          placeholder='alexander@smith.com'
          iconSrc='/assets/icons/email.svg'
          iconAlt='email icon'
          autoComplete='email'
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name='phone'
          label='Phone number'
          placeholder='+123 456 7890'
          autoComplete='phone'
        />
        <SubmitDutton isLoading={isLoading}>Get started</SubmitDutton>
      </form>
    </Form>
  );
};

export default PatientForm;
