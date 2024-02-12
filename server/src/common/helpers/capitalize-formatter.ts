export const capitalizeFormatter = (string: string): string => {
  const output = string[0].toUpperCase() + string.toLowerCase().substring(1);
  return output;
};
