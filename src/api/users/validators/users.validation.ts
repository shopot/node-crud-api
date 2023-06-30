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

export const validatePutUserDto = (resource: { [key: string]: string | string[] | number }) => {
  const attrCount = Object.keys(resource).length;

  if (attrCount > 3) {
    return false;
  }

  const result = Object.keys(resource)
    .join('')
    .replace(/username|age|hobbies/g, '');

  if (result !== '') {
    return false;
  }

  if (resource.username !== undefined && typeof resource.username !== 'string') {
    return false;
  }

  if (resource.age !== undefined && typeof resource.age !== 'number') {
    return false;
  }

  if (
    resource.hobbies !== undefined &&
    (!Array.isArray(resource.hobbies) ||
      resource.hobbies.some((value) => typeof value !== 'string'))
  ) {
    return false;
  }

  return true;
};
