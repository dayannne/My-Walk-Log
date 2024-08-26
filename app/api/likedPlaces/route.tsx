import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const likedPlaces = url.searchParams.getAll('likedPlaces[]');

    const places = await prisma.place.findMany({
      where: {
        id: {
          in: likedPlaces,
        },
      },
      include: {
        placeDetail: true,
      },
    });

    if (places.length === 0) {
      return NextResponse.json(
        { message: '일치하는 Place 데이터를 찾을 수 없습니다' },
        { status: 404 },
      );
    }

    return NextResponse.json([...places], { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: '서버 내부 오류' }, { status: 500 });
  }
}
