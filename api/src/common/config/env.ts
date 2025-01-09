import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number(),
  DATABASE_URL: z.coerce.string(),
  SWAGGER_USER: z.string(),
  SWAGGER_PASSWORD: z.string(),
});

const getEnv = envSchema.safeParse(process.env);

if (!getEnv.success) {
  const errorMessage = 'load environment failed';
  console.error(errorMessage, getEnv.error.format());
  throw new Error(errorMessage);
}

export const env = getEnv.data;
