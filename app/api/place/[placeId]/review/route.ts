import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { placeId: string } },
) {
  const { placeId } = params;

  try {
    const reviews = await prisma.review.findMany({
      where: { placeId },
      include: {
        author: {
          include: {
            reviews: true,
          },
        },
        place: true,
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json(
      { message: '리뷰를 불러오는 중 에러가 발생했습니다.' },
      { status: 500 },
    );
  }
}
