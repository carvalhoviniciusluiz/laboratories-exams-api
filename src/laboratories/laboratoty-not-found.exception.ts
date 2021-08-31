import { InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';

export class LaboratoryNotFoundException extends NotFoundException {
  static withId(id: string): LaboratoryNotFoundException {
    return new LaboratoryNotFoundException(`The laboratory with id "${id}" was not found`);
  }

  static withName(name: string): InternalServerErrorException {
    return new UnauthorizedException(`The laboratory with name "${name}" was not found`);
  }
}
