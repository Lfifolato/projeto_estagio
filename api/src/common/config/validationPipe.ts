import {
  ValidationPipe,
  UnprocessableEntityException,
  ValidationError,
} from '@nestjs/common';

export const createValidationPipe = () => {
  const formatErrors = (errors: ValidationError[]) => {
    return errors.map((error) => {
      if (error.children && error.children.length) {
        return {
          property: error.property,
          children: formatErrors(error.children),
        };
      }

      const constraints = error.constraints
        ? Object.values(error.constraints)
        : ['Validation error'];

      return {
        property: error.property,
        message: constraints[0],
      };
    });
  };

  return new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) => {
      const result = formatErrors(errors);
      return new UnprocessableEntityException(result);
    },
    stopAtFirstError: true,
  });
};
