import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ErrorResponseDto } from './dto/error-response.dto';
import { SuccessResponseDto } from './dto/success-response.dto';

interface ApiResponseOptions {
  status: number;
  description?: string;
  type?: Type<any>;
  isArray?: boolean;
  isMessageOnly?: boolean;
  example?: any;
}

interface ApiDynamicOptions {
  summary: string; // Descrição do método (summary)
  responses?: ApiResponseOptions[];
  isPublic?: boolean; // Define se a rota é pública (sem token)
}

export function ApiDynamicResponses({
  summary,
  responses = [],
  isPublic = false,
}: ApiDynamicOptions) {
  const decorators = [ApiOperation({ summary })];

  if (!isPublic) {
    decorators.push(ApiBearerAuth());
  }

  const defaultErrorResponses: ApiResponseOptions[] = [
    {
      status: 401,
      description: 'Unauthorized',
      type: ErrorResponseDto,
    },
    {
      status: 403,
      description: 'Forbidden',
      type: ErrorResponseDto,
    },
  ];

  const allResponses = [...responses, ...defaultErrorResponses];

  allResponses.forEach((response) => {
    const apiResponseOptions: any = {
      status: response.status,
      description: response.description,
      type: response.isMessageOnly ? SuccessResponseDto : response.type,
    };

    if (response.example) {
      apiResponseOptions.example = response.example;
    }

    decorators.push(ApiResponse(apiResponseOptions));
  });

  return applyDecorators(...decorators);
}
