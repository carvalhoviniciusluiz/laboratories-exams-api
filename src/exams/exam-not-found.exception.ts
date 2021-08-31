import { InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';

export class ExamNotFoundException extends NotFoundException {
  static withId(id: string): ExamNotFoundException {
    return new ExamNotFoundException(`The exam with id "${id}" was not found`);
  }

  static withName(name: string): InternalServerErrorException {
    return new UnauthorizedException(`The exam with name "${name}" was not found`);
  }
}
