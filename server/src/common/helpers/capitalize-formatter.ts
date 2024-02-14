export const capitalizeFormatter = (string: string): string => {
  if (string.length === 0) return "";

  const output = string[0].toUpperCase() + string.toLowerCase().substring(1);
  return output;
};
