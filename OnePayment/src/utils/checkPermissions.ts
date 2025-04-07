const checkPermissions = (permissions: string[], userPermissions: string[]) => {
  return permissions.some((permission) =>
    userPermissions.includes(permission)
  );
};

export default checkPermissions;
