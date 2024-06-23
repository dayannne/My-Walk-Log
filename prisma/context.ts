import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
// node 환경이 production이 아닐 때 prisma에 client를 할당
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;
