import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { diaryId: string } },
) {
  const id = parseInt(params.diaryId);

  // id 유효성 검사
  if (isNaN(id)) {
    return NextResponse.json(
      { status: 'error', message: '유효한 일기 ID를 입력하세요.' },
      { status: 400 },
    );
  }

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

    // 일기가 존재하지 않는 경우
    if (!diary) {
      return NextResponse.json(
        { status: 'error', message: '해당 ID의 일기를 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        status: 'success',
        data: diary,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: '서버 에러가 발생했습니다.' },
      { status: 500 },
    );
  }
}
