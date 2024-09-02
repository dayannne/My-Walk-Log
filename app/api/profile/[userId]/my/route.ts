import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } },
) {
  const userId = parseInt(params.userId);
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        reviews: {
          include: {
            place: true,
            placeDetail: true,
          },
        },
        diaries: {
          include: {
            comments: true,
            placeDetail: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User를 찾을 수 없습니다' },
        { status: 404 },
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'PlaceDetail을 가져오는데 실패했습니다 : 서버 내부 오류' },
      { status: 500 },
    );
  }
}
