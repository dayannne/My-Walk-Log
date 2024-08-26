import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { reviewId: string; userId: string } },
) {
  const reviewId = parseInt(params.reviewId);
  const userId = parseInt(params.userId);

  if (!userId || !reviewId) {
    return new Response(
      JSON.stringify({
        message: '잘못된 요청 : 로그인 상태 / 장소 정보 확인',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  try {
    // 두 개의 업데이트를 단일 트랜잭션으로 수행
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          likedReviews: {
            push: reviewId,
          },
        },
      }),
      prisma.review.update({
        where: { id: reviewId },
        data: {
          likedBy: {
            push: userId,
          },
        },
      }),
    ]);

    return NextResponse.json(
      { data: { params }, message: '좋아요 성공' },
      { status: 200 },
    );
  } catch (error) {
    console.error('사용자 또는 장소 세부정보 업데이트 오류:', error);
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
