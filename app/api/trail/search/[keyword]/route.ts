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

    if (!trails) {
      return NextResponse.json(
        { message: '검색 결과가 존재하지 않습니다.' },
        { status: 404 },
      );
    }

    return NextResponse.json(trails, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: '서버 내부 오류' }, { status: 500 });
  }
}
