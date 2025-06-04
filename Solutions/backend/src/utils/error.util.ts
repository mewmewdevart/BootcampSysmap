export function createError(
  message: string,
  statusCode: number,
  details?: Record<string, unknown>
): { message: string; statusCode: number; details?: Record<string, unknown> } {
  return {
    message,
    statusCode,
    details,
  };
}
