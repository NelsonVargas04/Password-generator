import { commonWords } from './wordList';

export type PasswordMode = 'random' | 'pin' | 'memorable';

export const generatePassword = (mode: PasswordMode, length: number): string => {
  switch (mode) {
    case 'memorable':
      return generateMemorablePassword();
    case 'pin':
      return generatePinPassword(length);
    default:
      return generateRandomPassword(length);
  }
};

const generateMemorablePassword = (): string => {
  const numWords = 3;
  const words = [];
  
  for (let i = 0; i < numWords; i++) {
    const randomIndex = Math.floor(Math.random() * commonWords.length);
    words.push(commonWords[randomIndex]);
  }
  
  // Agregar un número aleatorio al final para mayor seguridad
  const randomNum = Math.floor(Math.random() * 100);
  return `${words.join('-')}${randomNum}`;
};

const generatePinPassword = (length: number): string => {
  const chars = '0123456789';
  return generateFromChars(chars, length);
};

const generateRandomPassword = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  return generateFromChars(chars, length);
};

const generateFromChars = (chars: string, length: number): string => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};