export const isValidCapitalizedWords = (text: string): boolean => {

  const words = text.split(/\s+/);
    return words.every(word => {

      return /^[A-Z][a-z]*$/.test(word);
    });
  };