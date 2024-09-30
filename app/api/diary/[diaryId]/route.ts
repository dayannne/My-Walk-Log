import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { diaryId: string } },
) {
  const id = parseInt(params.diaryId);

  try {
    const diary = await prisma.diary.findUnique({
      where: { id },
      include: {
        author: {
          include: {
            diaries: true,
          },
        },
        comments: {
          include: {
            author: true,
          },
        },
      },
    });

    return NextResponse.json(diary);
  } catch (error) {
    return NextResponse.json(
      { message: '일기를 불러오는 중 에러가 발생했습니다.' },
      { status: 500 },
    );
  }
}
