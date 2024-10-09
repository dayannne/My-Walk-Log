import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { reviewId: string; userId: string } },
) {
  const reviewId = parseInt(params.reviewId);
  const userId = parseInt(params.userId);

  if (isNaN(userId) || isNaN(reviewId)) {
    return NextResponse.json(
      {
        status: 'error',
        message: '유효하지 않은 장소 ID 또는 사용자 ID입니다.',
      },
      {
        status: 400,
      },
    );
  }

  try {
    // 두 개의 업데이트를 단일 트랜잭션으로 수행
    const [user, review] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: { likedReviews: true },
      }),
      prisma.review.findUnique({
        where: { id: reviewId },
        select: { likedBy: true },
      }),
    ]);

    if (!user || !review) {
      return NextResponse.json(
        {
          status: 'error',
          message: '리뷰 또는 사용자를 찾을 수 없습니다.',
        },
        {
          status: 404,
        },
      );
    }

    const userHasLiked = user.likedReviews.includes(reviewId);
    const reviewHasLiked = review.likedBy.includes(userId);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          likedReviews: userHasLiked
            ? { set: user.likedReviews.filter((id) => id !== reviewId) }
            : { push: reviewId },
        },
      }),
      prisma.review.update({
        where: { id: reviewId },
        data: {
          likedBy: reviewHasLiked
            ? { set: review.likedBy.filter((id) => id !== userId) }
            : { push: userId },
        },
      }),
    ]);

    const message = userHasLiked ? '좋아요가 취소되었습니다.' : '좋아요 성공';

    return NextResponse.json(
      {
        status: 'success',
        message,
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
