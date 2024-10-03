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
          where: {
            isPublic: true,
          },
          include: { author: true, comments: true },
        },
      },
    });

    if (!placeDetail) {
      return NextResponse.json(
        {
          status: 'error',
          message: '해당 ID의 장소를 찾을 수 없습니다.',
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { status: 'success', data: { ...placeDetail } },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: '서버 에러가 발생했습니다.' },
      { status: 500 },
    );
  }
}
