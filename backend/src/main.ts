import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcrypt';

async function ensureDefaultAdmin() {
  const prisma = new PrismaService();
  const email = 'admin@gmail.com';
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // if exist but not admin, promote
    if (existing.role !== 'admin') {
      await prisma.user.update({
        where: { id: existing.id },
        data: { role: 'admin', name: 'admin' },
      });
    }
    return;
  }
  const hashed = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: { email, password: hashed, name: 'admin', role: 'admin' },
  });
  console.log('Default admin created: admin@gmail.com / admin123');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, credentials: true });
  await app.listen(process.env.PORT ?? 4000);
  await ensureDefaultAdmin();
}
bootstrap();
