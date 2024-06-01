export const getError = (
  message: string | undefined = undefined
): { status: boolean; message: string | undefined } => {
  const status = message !== "" && !!message;
  return { message, status };
};
