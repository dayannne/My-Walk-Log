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
      skip,
      take,
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

    const totalDiaries = await prisma.diary.count();

    return NextResponse.json(
      {
        status: 'success',
        data: diaries.length ? diaries : [],
        page,
        pageSize,
        totalPages: Math.ceil(totalDiaries / pageSize),
        totalDiaries,
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
