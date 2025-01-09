import * as bcrypt from 'bcryptjs';
export const validarHash = async (valor: string, valorHash: string) => {
  const isMath = await bcrypt.compare(valor, valorHash);
  return isMath;
};
