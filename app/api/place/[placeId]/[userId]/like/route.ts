import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { placeId: string; userId: string } },
) {
  const userId = parseInt(params.userId);
  const placeId = params.placeId;

  if (isNaN(userId) || !placeId) {
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
    const [user, place] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: { likedPlaces: true },
      }),
      prisma.placeDetail.findUnique({
        where: { id: placeId },
        select: { likedBy: true },
      }),
    ]);

    if (!user || !place) {
      return NextResponse.json(
        { status: 'error', message: '장소 또는 사용자를 찾을 수 없습니다.' },
        {
          status: 404,
        },
      );
    }

    const placeHasLiked = place.likedBy.includes(userId);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          likedPlaces: placeHasLiked
            ? { set: user.likedPlaces.filter((id) => id !== placeId) }
            : { push: placeId },
        },
      }),
      prisma.placeDetail.update({
        where: { id: placeId },
        data: {
          likedBy: placeHasLiked
            ? { set: place.likedBy.filter((id) => id !== userId) }
            : { push: userId },
        },
      }),
    ]);

    const message = placeHasLiked ? '좋아요가 취소되었습니다.' : '좋아요 성공';

    return NextResponse.json({ status: 'success', message }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: '서버 에러가 발생했습니다.' },
      {
        status: 500,
      },
    );
  }
}
