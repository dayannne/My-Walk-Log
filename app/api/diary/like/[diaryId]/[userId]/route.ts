import { NextResponse } from 'next/server';
import prisma from '@/prisma/context';

export async function POST(
  request: Request,
  { params }: { params: { diaryId: string; userId: string } },
) {
  const diaryId = parseInt(params.diaryId);
  const userId = parseInt(params.userId);

  if (!userId || isNaN(diaryId)) {
    return new Response(
      JSON.stringify({
        message: '잘못된 요청 : 로그인 상태 / 일기 정보 확인',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          likedDiaries: {
            push: diaryId,
          },
        },
      }),
      prisma.diary.update({
        where: { id: diaryId },
        data: {
          likedBy: {
            push: userId,
          },
        },
      }),
    ]);

    return NextResponse.json({ message: '좋아요 성공' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
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

export async function DELETE(
  request: Request,
  { params }: { params: { diaryId: string; userId: string } },
) {
  const diaryId = parseInt(params.diaryId);
  const userId = parseInt(params.userId);

  if (isNaN(diaryId) || isNaN(userId)) {
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
    const diary = await prisma.diary.findUnique({
      where: { id: diaryId },
    });

    if (diary && diary.likedBy.includes(userId)) {
      await prisma.$transaction([
        prisma.diary.update({
          where: { id: diaryId },
          data: {
            likedBy: {
              set: diary.likedBy.filter((id) => id !== userId),
            },
          },
        }),
        prisma.user.update({
          where: { id: userId },
          data: {
            likedDiaries: {
              set: (
                await prisma.user.findUnique({ where: { id: userId } })
              )?.likedDiaries?.filter((id) => id !== diaryId),
            },
          },
        }),
      ]);

      return NextResponse.json(
        { message: '좋아요가 취소되었습니다.' },
        { status: 200 },
      );
    } else {
      return new Response(
        JSON.stringify({ message: '좋아요가 존재하지 않습니다.' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ message: '서버 내부 오류' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
