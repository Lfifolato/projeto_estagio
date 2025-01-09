import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  APPTOKENJWT: z.coerce.string(),
  PORT: z.coerce.number(),
  DATABASE_URL: z.coerce.string(),
  URLWEB: z.coerce.string(),
  S3_HOST: z.string(),
  S3_ACCESSKEYID: z.string(),
  S3_SECRERACCESSKEY: z.string(),
  S3_REGION: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string(),
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
