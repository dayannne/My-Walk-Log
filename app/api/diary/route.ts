import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const diaries = await prisma.diary.findMany({
      skip,
      take,
      include: {
        author: {
          include: {
            diaries: true,
          },
        },
        placeDetail: true,
      },
    });

    if (!diaries) {
      return NextResponse.json({ message: '잘못된 request' }, { status: 400 });
    }

    const totalDiaries = await prisma.diary.count();

    return NextResponse.json({
      data: diaries,
      page,
      pageSize,
      totalPages: Math.ceil(totalDiaries / pageSize),
      totalDiaries,
    });
  } catch (error) {
    return NextResponse.json(
      { message: '일기 피드를 불러오는 중 에러가 발생했습니다.' },
      { status: 500 },
    );
  }
}
