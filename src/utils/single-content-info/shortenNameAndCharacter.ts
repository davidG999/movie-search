const shortenNameAndCharacter = (str: string): string => {
  if (str?.length > 15) {
    return str.substring(0, 14) + "...";
  }
  return str;
};

export default shortenNameAndCharacter;
