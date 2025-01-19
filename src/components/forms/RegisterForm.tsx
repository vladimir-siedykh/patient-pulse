'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl } from '@/components/ui/form';
import CustomFormField from '../CustomFormField';
import { useState } from 'react';
import { PatientFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import { registerPatient } from '@/lib/actions/patient.actions';
import SubmitButton from '../SubmitButton';
import { FormFieldType } from './PatientForm';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from '@/constants';
import { Label } from '../ui/label';
import { SelectItem } from '../ui/select';
import Image from 'next/image';
import { FileUploader } from './FileUploader';

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);

    let formData;
    
    if (values.identificationDocument && values.identificationDocument?.length > 0) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append('blobFile', blobFile);
      formData.append('fileName', values.identificationDocument[0].name);
    }

    try {
      const patientData = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument ? formData : undefined,
        privacyConsent: values.privacyConsent,
      };

      const newPatient = await registerPatient(patientData);

      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex-1 space-y-6'>
        <section className='mb-12 space-y-4'>
          <h1 className='header'>Welcome 👋</h1>
          <p className='text-dark-700'>Let us know more about yourself.</p>
        </section>
        <section className='space-y-8 pt-2'>
          <h2 className='sub-header'>Personal information</h2>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='name'
            label='Full Name'
            placeholder='John Doe'
            iconSrc='/assets/icons/user.svg'
            iconAlt='user'
          />

          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='email'
              label='Email'
              placeholder='johndoe@gmail.com'
              iconSrc='/assets/icons/email.svg'
              iconAlt='email'
            />
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name='phone'
              label='Phone number'
              placeholder='(555) 123-4567'
            />
          </div>

          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name='birthDate'
              label='Date of birth'
              placeholder='MM/DD/YYYY'
              iconSrc='/assets/icons/calendar.svg'
              iconAlt='calendar'
              dateFormat='mm/dd/yyyy  -  h:mm aa'
            />
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name='gender'
              label='Gender'
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className='flex h-11 gap-6 xl:justify-between'
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option) => (
                      <div className='radio-group' key={option}>
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className='cursor-pointer'>
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='address'
              label='Address'
              placeholder='123 Main St, City, Country'
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='occupation'
              label='Occupation'
              placeholder='Software Engineer'
            />
          </div>

          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='emergencyContactName'
              label='Emergency contact name'
              placeholder='Guardians name'
            />
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name='emergencyContactNumber'
              label='Emergency contact phone number'
              placeholder='(555) 123-4567'
            />
          </div>
        </section>
        <section className='space-y-8 pt-8'>
          <h2 className='sub-header'>Medical information</h2>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name='primaryPhysician'
            label='Primary care physician'
            placeholder='Select a physician'
          >
            {Doctors.map((doctor, i) => (
              <SelectItem
                key={doctor.name + i}
                value={doctor.name}
                className='cursor-pointer hover:bg-dark-500'
              >
                <div className='flex items-center gap-2'>
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt='doctor'
                    className='rounded-full border border-dark-500'
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='insuranceProvider'
              label='Insurance provider'
              placeholder='Blue Cross Blue Shield'
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='insurancePolicyNumber'
              label='Insurance policy number'
              placeholder='ASD1234567890'
            />
          </div>

          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name='allergies'
              label='Allergies'
              placeholder='Penicillin, Pollen, etc.'
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name='currentMedications'
              label='Current medications'
              placeholder='Aspirin, Ibuprofen, etc.'
            />
          </div>

          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name='familyMedicalHistory'
              label='Family medical history'
              placeholder='Grandmother had diabetes, Uncle had cancer, etc.'
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name='pastMedicalHistory'
              label='Past medical history'
              placeholder='Appendicitis, Gallstones, etc.'
            />
          </div>
        </section>
        <section className='space-y-8 pt-8'>
          <h2 className='sub-header'>Identity and verification</h2>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name='identificationType'
            label='Identification type'
            placeholder='Select an identification type'
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type} className='cursor-pointer hover:bg-dark-500'>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='identificationNumber'
            label='Identification Number'
            placeholder='123456789'
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name='identificationDocument'
            label='Scanned Copy of Identification Document'
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='sub-header'>Consent and Privacy</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='treatmentConsent'
            label='I consent to receive treatment for my health condition.'
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='disclosureConsent'
            label='I consent to the use and disclosure of my health
            information for treatment purposes.'
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='privacyConsent'
            label='I acknowledge that I have reviewed and agree to the
            privacy policy'
          />
        </section>

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
