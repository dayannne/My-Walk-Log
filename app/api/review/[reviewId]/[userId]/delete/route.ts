import { NextResponse } from 'next/server';
import prisma from '@/prisma/context';

export async function DELETE(
  request: Request,
  { params }: { params: { reviewId: string; userId: string } },
) {
  const reviewId = parseInt(params.reviewId);
  const userId = parseInt(params.userId);

  if (isNaN(reviewId) || isNaN(userId)) {
    return new Response(
      JSON.stringify({
        message: '잘못된 요청',
      }),
      {
        status: 400,
      },
    );
  }

  try {
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    });
    if (!review) {
      return new Response(
        JSON.stringify({ message: '존재하지 않는 리뷰입니다.' }),
        {
          status: 404,
        },
      );
    }
    if (review.authorId !== userId) {
      return NextResponse.json(
        { message: '권한이 없습니다.' },
        { status: 403 },
      );
    }

    await prisma.review.delete({
      where: { id: reviewId },
    });

    return NextResponse.json(
      { message: '리뷰가 삭제되었습니다.' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: 'SERVER ERROR' }, { status: 500 });
  }
}
