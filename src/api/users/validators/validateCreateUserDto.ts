export const validateCreateUserDto = (resource: { [key: string]: string | string[] | number }) => {
  return (
    resource.username !== undefined &&
    typeof resource.username === 'string' &&
    resource.age !== undefined &&
    typeof resource.age === 'number' &&
    resource.hobbies !== undefined &&
    Array.isArray(resource.hobbies) &&
    resource.hobbies.every((value) => typeof value === 'string')
  );
};
