
export class ValidationError extends Error {
  public readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
    this.name = 'ValidationError';
  }
}
  