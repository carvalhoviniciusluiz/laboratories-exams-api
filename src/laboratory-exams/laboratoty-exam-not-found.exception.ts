import { UnauthorizedException } from '@nestjs/common';

export class LaboratoryExamNotFoundException extends UnauthorizedException {
  static withId(message: string): LaboratoryExamNotFoundException {
    return new LaboratoryExamNotFoundException(message);
  }
}
