import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { placeId: string } },
) {
  const { placeId } = params;
  try {
    const placeDetail = await prisma.placeDetail.findFirst({
      where: {
        id: placeId,
      },
      include: {
        reviews: {
          include: { author: true },
        },
        diaries: {
          include: { author: true, comments: true },
        },
      },
    });

    if (!placeDetail) {
      return NextResponse.json(
        { message: 'placeId에 해당하는 데이터를 찾을 수 없습니다' },
        { status: 404 },
      );
    }

    return NextResponse.json(placeDetail, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: '서버 내부 오류' }, { status: 500 });
  }
}
