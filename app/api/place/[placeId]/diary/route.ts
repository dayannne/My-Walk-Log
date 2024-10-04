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
      orderBy: {
        createdAt: 'desc', // 최신 순으로 정렬
      },
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

    return NextResponse.json(
      {
        status: 'success',
        data: diaries,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: '서버 에러가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
