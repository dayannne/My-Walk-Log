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
      where: {
        isPublic: true,
      },
      skip, // 건너뛸 항목 수
      take, // 가져올 항목 수
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

    // 다이어리가 없을 경우
    if (!diaries) {
      return NextResponse.json(
        { message: '피드(일기)가 존재하지 않습니다.' },
        { status: 404 },
      );
    }

    const totalDiaries = await prisma.diary.count();

    return NextResponse.json(
      {
        message: 'OK',
        data: diaries,
        page,
        pageSize,
        totalPages: Math.ceil(totalDiaries / pageSize),
        totalDiaries,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: 'SERVER ERROR' }, { status: 500 });
  }
}
