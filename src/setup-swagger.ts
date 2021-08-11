import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from 'nestjs-redoc';

export async function setupSwagger(app: INestApplication): Promise<void> {
  const config = new DocumentBuilder()
    .setTitle('')
    .setDescription(
      `
# 概述

支持 Markdown 语法

  `,
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/doc/api-swagger`, app, document);

  const redocOptions: RedocOptions = {
    // logo: {
    //   url: '',
    //   backgroundColor: '#2C4E86',
    //   altText: 'Kilinpay logo',
    // },
    // sortPropsAlphabetically: true,
    hideDownloadButton: true,
    requiredPropsFirst: true,
    // hideHostname: true,
    disableSearch: true,
  };

  await RedocModule.setup(`/doc/api-redoc`, app, document, redocOptions);
}
