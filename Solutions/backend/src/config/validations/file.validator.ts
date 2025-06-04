import { createError } from '@utils/error.util';
import { ERROR_IMAGE_FORMAT } from '@constants/errorMessages';

export function validateFile(file?: Express.Multer.File): Express.Multer.File {
  if (!file) {
    throw createError(ERROR_IMAGE_FORMAT, 400);
  }
  
  const validMimeTypes = ['image/jpg', 'image/png'];
  if (!validMimeTypes.includes(file.mimetype)) {
    throw createError(ERROR_IMAGE_FORMAT, 400);
  }

  return file;
}