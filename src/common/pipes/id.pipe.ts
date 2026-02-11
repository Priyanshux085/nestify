import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { STATUS_CODES } from 'http';

@Injectable()
export class IdValidPipe implements PipeTransform<string> {
  transform(value: string): number {
    const MIN_VALUE = 1;
    const val = parseInt(value, 10);
    if (isNaN(val) || !isFinite(val) || val < MIN_VALUE) {
      throw new BadRequestException({
        success: false,
        statusCode: STATUS_CODES[400],
        message: `Invalid ID: ${value}. ID must be a positive integer.`,
        error: 'Bad Request',
      });
    }
    return val;
  }
}
