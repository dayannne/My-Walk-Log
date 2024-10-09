import { NextResponse } from 'next/server';
import prisma from '@/prisma/context';

export async function DELETE(
  request: Request,
  { params }: { params: { reviewId: string; userId: string } },
) {
  const reviewId = parseInt(params.reviewId);
  const userId = parseInt(params.userId);

  if (isNaN(reviewId) || isNaN(userId)) {
    return NextResponse.json(
      {
        status: 'error',
        message: '유효하지 않은 리뷰 ID 또는 사용자 ID입니다.',
      },
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
      return NextResponse.json(
        {
          status: 'error',
          message: '리뷰를 찾을 수 없습니다.',
        },
        {
          status: 404,
        },
      );
    }

    if (review.authorId !== userId) {
      return NextResponse.json(
        {
          status: 'error',
          message: '권한이 없습니다.',
        },
        {
          status: 403,
        },
      );
    }

    await prisma.review.delete({
      where: { id: reviewId },
    });

    return NextResponse.json(
      {
        status: 'success',
        message: '리뷰가 삭제되었습니다.',
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: '서버 에러가 발생했습니다.',
      },
      {
        status: 500,
      },
    );
  }
}
