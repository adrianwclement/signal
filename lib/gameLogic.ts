export const generateCipher = (): Record<string, string> => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const shuffled = alphabet
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
  const cipher: Record<string, string> = {};

  for (let i = 0; i < alphabet.length; i++) {
    cipher[alphabet[i]] = shuffled[i];
  }

  return cipher;
};

export const encodeMessage = (
  message: string,
  cipher: Record<string, string>
): string => {
  return message
    .toUpperCase()
    .split("")
    .map((char) => cipher[char] || char)
    .join("");
};

export const decodeMessage = (
  encodeMessage: string,
  cipher: Record<string, string>
): string => {
  const inverseCipher: Record<string, string> = {};
  for (const key in cipher) {
    inverseCipher[cipher[key]] = key;
  }

  return encodeMessage
    .toUpperCase()
    .split("")
    .map((char) => inverseCipher[char] || char)
    .join("");
};

export const isCorrectDecode = (
  originalMessage: string,
  decodedMessage: string
): boolean => {
  return originalMessage.toUpperCase() === decodedMessage.toUpperCase();
};
