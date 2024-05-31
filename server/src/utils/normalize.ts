export const normalizePort = (port: string): number | undefined => {
  const normalizedPort = parseInt(port, 10);

  if (isNaN(normalizedPort)) return Number(port);
  if (normalizedPort >= 0) return normalizedPort;

  return undefined;
};
