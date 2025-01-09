export const gerarRandom = () => {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numeros = '0123456789';

  function gerarCaractereAleatorio(str) {
    return str.charAt(Math.floor(Math.random() * str.length));
  }

  let resultado = '';

  for (let i = 0; i < 3; i++) {
    resultado += gerarCaractereAleatorio(letras);
  }

  for (let i = 0; i < 3; i++) {
    resultado += gerarCaractereAleatorio(numeros);
  }

  return resultado;
};
