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
        { message: '존재하지 않는 장소입니다.' },
        { status: 404 },
      );
    }

    return NextResponse.json(placeDetail, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'SERVER ERROR' }, { status: 500 });
  }
}
