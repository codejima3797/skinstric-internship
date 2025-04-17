export const isValidCapitalizedWords = (text: string): boolean => {
  // Split the text into words and check each word
  const words = text.split(/\s+/);
  return words.every(word => {
    // Check if the word starts with a capital letter and the rest are lowercase
    return /^[A-Z][a-z]*$/.test(word);
  });
}; 