import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { placeId: string; userId: string } },
) {
  const placeId = params.placeId;
  const userId = parseInt(params.userId);
  try {
    // 해당 사용자가 해당 장소를 좋아요 했는지 확인합니다.
    const placeDetail = await prisma.placeDetail.findUnique({
      where: {
        id: placeId,
      },
    });

    if (
      placeDetail &&
      placeDetail.likedBy &&
      placeDetail.likedBy.includes(userId)
    ) {
      // 장소 디테일의 likedBy 배열에서 해당 사용자 id를 제거합니다.
      await prisma.placeDetail.update({
        where: {
          id: placeId,
        },
        data: {
          likedBy: {
            set: placeDetail.likedBy.filter((id) => id !== userId),
          },
        },
      });

      // 사용자의 likedPlaces 배열에서 해당 장소 id를 제거합니다.
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          likedPlaces: {
            set: (
              await prisma.user.findUnique({
                where: {
                  id: userId,
                },
              })
            )?.likedPlaces?.filter((id) => id !== placeId),
          },
        },
      });
    } else {
      return NextResponse.json(
        {
          message: '오류가 발생했습니다',
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        data: { data: placeDetail?.likedBy, params },
        message: '좋아요가 취소되었습니다.',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}
