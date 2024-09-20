import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { placeId: string } },
) {
  const { placeId } = params;

  try {
    const diaries = await prisma.diary.findMany({
      where: { placeId },
      include: {
        author: {
          include: {
            diaries: true,
          },
        },
        comments: true,
        placeDetail: true,
      },
    });

    return NextResponse.json(diaries);
  } catch (error) {
    return NextResponse.json(
      { message: '일기를 불러오는 중 에러가 발생했습니다.' },
      { status: 500 },
    );
  }
}
