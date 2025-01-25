'use server';

import { revalidatePath } from 'next/cache';
import { ID, Query } from 'node-appwrite';

import { Appointment } from '@/types/appwrite.types';

import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases, messaging } from '../appwrite.config';
import { formatDateTime, parseStringify } from '../utils';

//  CREATE APPOINTMENT
export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    revalidatePath('/admin');
    return parseStringify(newAppointment);
  } catch (error) {
    console.error('An error occurred while creating a new appointment:', error);
  }
};

//  GET RECENT APPOINTMENTS
export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, [
      Query.orderDesc('$createdAt'),
    ]);

    // const scheduledAppointments = (
    //   appointments.documents as Appointment[]
    // ).filter((appointment) => appointment.status === "scheduled");

    // const pendingAppointments = (
    //   appointments.documents as Appointment[]
    // ).filter((appointment) => appointment.status === "pending");

    // const canceledAppointments = (
    //   appointments.documents as Appointment[]
    // ).filter((appointment) => appointment.status === "canceled");

    // const data = {
    //   totalCount: appointments.total,
    //   scheduledCount: scheduledAppointments.length,
    //   pendingCount: pendingAppointments.length,
    //   canceledCount: canceledAppointments.length,
    //   documents: appointments.documents,
    // };

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      canceledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
      switch (appointment.status) {
        case 'scheduled':
          acc.scheduledCount++;
          break;
        case 'pending':
          acc.pendingCount++;
          break;
        case 'canceled':
          acc.canceledCount++;
          break;
      }
      return acc;
    }, initialCounts);

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error('An error occurred while retrieving the recent appointments:', error);
  }
};

//  SEND SMS NOTIFICATION
export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    // https://appwrite.io/docs/references/1.5.x/server-nodejs/messaging#createSms
    const message = await messaging.createSms(ID.unique(), content, [], [userId]);
    return parseStringify(message);
  } catch (error) {
    console.error('An error occurred while sending sms:', error);
  }
};

//  UPDATE APPOINTMENT
export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
  timeZone,
}: UpdateAppointmentParams) => {
  try {
    // Update appointment to scheduled -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#updateDocument
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      type === 'cancel'
        ? { status: appointment.status, cancelationReason: appointment.cancelationReason }
        : {
            status: appointment.status,
            primaryPhysician: appointment.primaryPhysician,
            schedule: appointment.schedule,
          }
    );

    if (!updatedAppointment) throw Error('Failed to update appointment');

    // Send SMS notification
    // const smsMessage = `Greetings from Patient Pulse. ${type === 'schedule' ? `Your appointment is confirmed for ${formatDateTime(appointment.schedule!,
    // timeZone).dateTime} with Dr. ${appointment.primaryPhysician}` : `We regret to inform that your appointment for ${formatDateTime(appointment.schedule!, timeZone).dateTime} is canceled. Reason:  ${appointment.cancelationReason}`}.`;
    // await sendSMSNotification(userId, smsMessage);

    revalidatePath('/admin');
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error('An error occurred while scheduling an appointment:', error);
  }
};

// GET APPOINTMENT
export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.error('An error occurred while retrieving the existing patient:', error);
  }
};

export const getPatientAppointments = async (userId: string) => {
  try {
    const appointments = await databases.listDocuments(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, [
      Query.equal('userId', userId),
    ]);

    return parseStringify(appointments.documents);
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
  }
};
