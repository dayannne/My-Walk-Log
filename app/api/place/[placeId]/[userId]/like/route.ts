import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { placeId: string; userId: string } },
) {
  const userId = parseInt(params.userId);
  const placeId = params.placeId;

  if (isNaN(userId) || !placeId) {
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
      return new Response(
        JSON.stringify({ message: '장소 또는 사용자를 찾을 수 없습니다.' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
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

    return NextResponse.json({ message }, { status: 200 });
  } catch (error) {
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
