import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { placeId: string; userId: string } },
) {
  const userId = parseInt(params.userId);

  if (!userId || !params.placeId) {
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
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        likedPlaces: {
          push: params.placeId,
        },
      },
    });

    await prisma.placeDetail.update({
      where: {
        id: params.placeId,
      },
      data: {
        likedBy: {
          push: userId,
        },
      },
    });

    return NextResponse.json(
      { data: { userId, params }, message: '좋아요 성공' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error updating user or placeDetail:', error);
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
