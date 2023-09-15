export const modifiedLocaitionName = (locationName: string) => {
  const splitedParts = locationName.split(' ');
  return splitedParts[splitedParts.length - 1];
};
