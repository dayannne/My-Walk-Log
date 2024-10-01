import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { reviewId: string; userId: string } },
) {
  const reviewId = parseInt(params.reviewId);
  const userId = parseInt(params.userId);

  try {
    // 해당 사용자가 해당 장소를 좋아요 했는지 확인
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (review && review.likedBy && review.likedBy.includes(userId)) {
      // 트랜잭션으로 두 개의 업데이트 수행
      await prisma.$transaction([
        prisma.review.update({
          where: { id: reviewId },
          data: {
            likedBy: {
              set: review.likedBy.filter((id) => id !== userId),
            },
          },
        }),
        prisma.user.update({
          where: { id: userId },
          data: {
            likedReviews: {
              set: (
                await prisma.user.findUnique({
                  where: { id: userId },
                })
              )?.likedReviews?.filter((id) => id !== reviewId),
            },
          },
        }),
      ]);

      return NextResponse.json(
        {
          data: { likedBy: review.likedBy, params },
          message: '좋아요가 취소되었습니다.',
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { data: review, message: '오류가 발생했습니다' },
        { status: 400 },
      );
    }
  } catch (error) {
    return NextResponse.json({ message: 'SERVER ERROR' }, { status: 500 });
  }
}
