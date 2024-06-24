import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    const placeDetail = await prisma.placeDetail.findFirst({
      where: {
        id,
      },
      include: {
        place: true,
        reviews: true,
        diaries: true,
        likedBy: true,
      },
    });

    if (!placeDetail) {
      return NextResponse.json(
        { message: 'PlaceDetail을 찾을 수 없습니다' },
        { status: 404 },
      );
    }

    return NextResponse.json(placeDetail, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'PlaceDetail을 가져오는데 실패했습니다 : 서버 내부 오류' },
      { status: 500 },
    );
  }
}
