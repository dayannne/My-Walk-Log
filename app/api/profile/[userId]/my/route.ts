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
        { message: '로그인 후 이용 가능합니다.' },
        { status: 401 },
      );
    }

    return NextResponse.json({ message: 'OK', user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'SERVER ERROR' }, { status: 500 });
  }
}
