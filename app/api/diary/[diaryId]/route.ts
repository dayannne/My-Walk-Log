import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { truncate } from 'fs/promises';

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
        author: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
    });

    if (!diary) {
      return NextResponse.json(
        { message: '존재하지 않는 일기입니다.' },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: 'OK', data: diary }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'SERVER ERROR' }, { status: 500 });
  }
}
