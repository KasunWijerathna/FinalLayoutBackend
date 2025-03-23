import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    
    // Security middleware
    app.use(helmet({
      contentSecurityPolicy: false, // This is needed for Swagger UI
      crossOriginResourcePolicy: { policy: "cross-origin" },
      crossOriginOpenerPolicy: { policy: "unsafe-none" },
    }));
    app.use(compression());

    // Enable CORS
    app.enableCors({
      origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
      exposedHeaders: ['Content-Range', 'X-Content-Range'],
      maxAge: 3600,
    });

    // Set global prefix
    app.setGlobalPrefix('api');

    // Global pipes and filters
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor());

    // Swagger documentation setup
    const config = new DocumentBuilder()
      .setTitle('Location Device Management API')
      .setDescription('API documentation for Location Device Management application')
      .setVersion('1.0')
      .addBearerAuth()
      .addServer('http://localhost:3001', 'Local environment')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    const port = configService.get('PORT') || 3001;
    await app.listen(port, '0.0.0.0', () => {
      console.log('\n----------------------------------------');
      console.log('🌟 Application is ready!');
      console.log('----------------------------------------');
      console.log(`🔗 API URL: http://localhost:${port}/api`);
      console.log(`📖 Swagger UI: http://localhost:${port}/docs`);
      console.log(`🌐 Frontend URL: ${configService.get('FRONTEND_URL')}`);
      console.log('----------------------------------------\n');
    });
  } catch (error) {
    console.error('\n❌ Error starting application:', error);
    process.exit(1);
  }
}
bootstrap();
