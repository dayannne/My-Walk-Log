import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { keyword: string } },
) {
  const { keyword } = params;

  try {
    const trails = await prisma.trail.findMany({
      where: {
        WLK_COURS_FLAG_NM: {
          contains: keyword,
        },
      },
    });

    // 검색 결과가 없을 경우 빈 배열 반환
    if (!trails.length) {
      return NextResponse.json(
        {
          status: 'error',
          message: '검색 결과가 존재하지 않습니다.',
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        status: 'success',
        data: trails,
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
