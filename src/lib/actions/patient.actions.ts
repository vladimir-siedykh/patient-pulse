'use server';
import { ID, Query } from 'node-appwrite';
import { users } from '../appwrite.config';
import { AppwriteException } from 'node-appwrite';

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      undefined, // password
      user.phone,
      user.name
    );

    return newUser;
  } catch (error) {
    if (error instanceof AppwriteException && error.code === 409) {
      const documents = await users.list([Query.equal('email', [user.email])]);
      return documents.users[0];
    }
    throw error;
  }
};
