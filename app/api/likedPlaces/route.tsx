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

    return NextResponse.json(
      {
        status: 'success',
        data: [...places] || [],
      },
      { status: places.length === 0 ? 204 : 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: '서버 에러가 발생했습니다.' },
      { status: 500 },
    );
  }
}
