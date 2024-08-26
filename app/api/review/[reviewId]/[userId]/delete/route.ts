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
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  try {
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    });
    if (!review) {
      return new Response(
        JSON.stringify({ message: '일기를 찾을 수 없습니다.' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }
    if (review.authorId !== userId) {
      return new Response(JSON.stringify({ message: '권한이 없습니다.' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await prisma.review.delete({
      where: { id: reviewId },
    });

    return NextResponse.json(
      { message: '리뷰가 삭제되었습니다.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ message: '서버 내부 오류' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
