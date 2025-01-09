import {
  DeleteObjectCommand,
  ListBucketsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { env } from 'src/common/config/env';
import { v4 as uuidv4 } from 'uuid';

type ResUpload = {
  url?: string;
  id_s3?: string;
  error: boolean;
  mensagemErro?: string;
};

type ResDelete = {
  error: boolean;
  mensagemErro?: string;
};

@Injectable()
export class S3Service {
  s3 = new S3Client({
    region: env.S3_REGION,
    endpoint: env.S3_HOST,
    credentials: {
      accessKeyId: env.S3_ACCESSKEYID,
      secretAccessKey: env.S3_SECRERACCESSKEY,
    },
    forcePathStyle: true,
  });

  async bucketsList() {
    const command = new ListBucketsCommand({});

    const { Owner, Buckets } = await this.s3.send(command);

    const data = {
      Owner: Owner,
      Buckets: Buckets,
    };

    return data;
  }

  urlDocumento(bucket: string, id: string): string {
    const url = `${env.S3_HOST}${bucket}/${id}`;
    return url;
  }

  async uploadDocumento(
    bucket: string,
    file: Express.Multer.File,
  ): Promise<ResUpload> {
    const id = uuidv4();
    const fileExtension = file.originalname.split('.').pop();
    const id_s3 = `${id}.${fileExtension}`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: id_s3,
      Body: file.buffer,
    });

    try {
      await this.s3.send(command);

      const data: ResUpload = {
        error: false,
        url: this.urlDocumento(bucket, id_s3),
        id_s3: id_s3,
      };

      return data;
    } catch (error) {
      const data: ResUpload = {
        error: true,
        mensagemErro: error,
      };

      return data;
    }
  }

  async deleteDocumento(bucket: string, id_s3: string): Promise<ResDelete> {
    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: id_s3,
    });
    try {
      await this.s3.send(command);

      const data: ResDelete = {
        error: false,
      };

      return data;
    } catch (error) {
      const data: ResDelete = {
        error: false,
        mensagemErro: error,
      };

      return data;
    }
  }
}
