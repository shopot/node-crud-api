import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from './user.types';

/** Class representing a user. */
export class User {
  id: string;

  username: string;

  age: number;

  hobbies: string[];

  /**
   * Create a user
   * @param {string} username - user's name (string, required)
   * @param {number} age  — user's age (number, required)
   * @param {string[]} hobbies  — user's hobbies (array of strings or empty array, required)
   */
  constructor({ username, age, hobbies }: CreateUserDto) {
    this.id = uuidv4();

    this.username = username;

    this.age = age;

    this.hobbies = hobbies;
  }
}
