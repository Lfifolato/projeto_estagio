import { hash } from 'bcryptjs';

export const CreateHash = async (valor: string) => {
  const hashText = await hash(valor, 8);
  return hashText;
};
