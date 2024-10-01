import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const likedPlaces = url.searchParams.getAll('likedPlaces[]');

    const places = await prisma.placeDetail.findMany({
      where: {
        id: {
          in: likedPlaces,
        },
      },
    });

    if (places.length === 0) {
      return NextResponse.json(
        { message: '찜한 장소가 존재하지 않습니다.' },
        { status: 404 },
      );
    }

    return NextResponse.json([...places], { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'SERVER ERROR' }, { status: 500 });
  }
}
