export const validateSourceDto = (source: { [key: string]: string | string[] | number }) => {
  return (
    source.username !== undefined &&
    typeof source.username === 'string' &&
    source.age !== undefined &&
    typeof source.age === 'number' &&
    source.hobbies !== undefined &&
    Array.isArray(source.hobbies) &&
    source.hobbies.every((value) => typeof value === 'string')
  );
};
