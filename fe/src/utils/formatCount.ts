export const formatCount = (count: number) => {
  if (count > 999) return '999+';
  return count.toString();
};
