'use server'; // prisma를 사용하기때문에 "use server" 선언
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
const csvParser = require('csv-parser');

const prisma = new PrismaClient();

type Trail = {
  ESNTL_ID: string;
  WLK_COURS_FLAG_NM: string;
  WLK_COURS_NM: string;
  COURS_DC: string;
  SIGNGU_NM: string;
  COURS_LEVEL_NM: string;
  COURS_LT_CN: string;
  COURS_DETAIL_LT_CN: string;
  ADIT_DC: string;
  COURS_TIME_CN: string;
  OPTN_DC: string;
  TOILET_DC: string;
  CVNTL_NM: string;
  LNM_ADDR: string;
  COURS_SPOT_LA: string;
  COURS_SPOT_LO: string;
};

async function main() {
  const trails: Trail[] = [];

  fs.createReadStream('public/data/trails.csv')
    .pipe(
      csvParser({
        mapHeaders: ({ header }: { header: string }) => header.trim(),
      }),
    )
    .on('data', (row: Trail) => {
      trails.push(row);
    })
    .on('end', async () => {
      console.log('CSV 파일이 성공적으로 처리되었습니다.');
      for (const trail of trails) {
        await prisma.trail.create({ data: trail });
      }
      console.log('모든 데이터가 삽입되었습니다.');
      await prisma.$disconnect();
    });
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
