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

    if (diaries.length === 0) {
      return NextResponse.json(
        { message: '해당 장소에 대한 일기 존재하지 않습니다.', data: [] },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: 'OK', data: diaries }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'SERVER ERROR' }, { status: 500 });
  }
}
