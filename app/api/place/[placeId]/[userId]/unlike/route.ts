import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { placeId: string; userId: string } },
) {
  const placeId = params.placeId;
  const userId = parseInt(params.userId);

  try {
    // 해당 사용자가 해당 장소를 좋아요 했는지 확인
    const placeDetail = await prisma.placeDetail.findUnique({
      where: { id: placeId },
    });

    if (
      placeDetail &&
      placeDetail.likedBy &&
      placeDetail.likedBy.includes(userId)
    ) {
      // 트랜잭션으로 두 개의 업데이트 수행
      await prisma.$transaction([
        prisma.placeDetail.update({
          where: { id: placeId },
          data: {
            likedBy: {
              set: placeDetail.likedBy.filter((id) => id !== userId),
            },
          },
        }),
        prisma.user.update({
          where: { id: userId },
          data: {
            likedPlaces: {
              set: (
                await prisma.user.findUnique({
                  where: { id: userId },
                })
              )?.likedPlaces?.filter((id) => id !== placeId),
            },
          },
        }),
      ]);

      return NextResponse.json(
        {
          data: { likedBy: placeDetail.likedBy, params },
          message: '좋아요가 취소되었습니다.',
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          message: '오류가 발생했습니다',
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error('삭제 중 오류 발생:', error);
    return new Response(JSON.stringify({ message: '서버 내부 오류' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
