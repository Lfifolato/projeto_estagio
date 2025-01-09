export const gerarNumeroRandom = (qtdRandom: number) => {
  const numeros = '0123456789';

  function gerarCaractereAleatorio(str) {
    return str.charAt(Math.floor(Math.random() * str.length));
  }

  let resultado = '';

  for (let i = 0; i < qtdRandom; i++) {
    resultado += gerarCaractereAleatorio(numeros);
  }

  return resultado;
};
