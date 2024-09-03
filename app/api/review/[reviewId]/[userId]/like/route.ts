import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { reviewId: string; userId: string } },
) {
  const reviewId = parseInt(params.reviewId);
  const userId = parseInt(params.userId);

  if (isNaN(userId) || isNaN(reviewId)) {
    return new Response(
      JSON.stringify({
        message: '잘못된 요청 : 로그인 상태 / 리뷰 정보 확인',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
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
      return new Response(
        JSON.stringify({ message: '리뷰 또는 사용자를 찾을 수 없습니다.' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
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

    return NextResponse.json({ message }, { status: 200 });
  } catch (error) {
    console.error('사용자 또는 리뷰 세부정보 업데이트 오류:', error);
    return new Response(
      JSON.stringify({
        message: '서버 내부 오류',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
