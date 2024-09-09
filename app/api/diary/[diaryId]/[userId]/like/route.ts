import { NextResponse } from 'next/server';
import prisma from '@/prisma/context';

export async function POST(
  request: Request,
  { params }: { params: { diaryId: string; userId: string } },
) {
  const diaryId = parseInt(params.diaryId);
  const userId = parseInt(params.userId);

  if (isNaN(diaryId) || isNaN(userId)) {
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
    // 사용자의 likedDiaries와 일기의 likedBy를 동시에 조회
    const [diary, user] = await Promise.all([
      prisma.diary.findUnique({
        where: { id: diaryId },
        select: { likedBy: true },
      }),
      prisma.user.findUnique({
        where: { id: userId },
        select: { likedDiaries: true },
      }),
    ]);

    if (!diary || !user) {
      return new Response(
        JSON.stringify({ message: '일기 또는 사용자를 찾을 수 없습니다.' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const userHasLiked = diary.likedBy.includes(userId);

    await prisma.$transaction([
      prisma.diary.update({
        where: { id: diaryId },
        data: {
          likedBy: {
            set: userHasLiked
              ? diary.likedBy.filter((id) => id !== userId)
              : [...diary.likedBy, userId],
          },
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: {
          likedDiaries: {
            set: userHasLiked
              ? user.likedDiaries.filter((id) => id !== diaryId)
              : [...user.likedDiaries, diaryId],
          },
        },
      }),
    ]);

    const message = userHasLiked ? '좋아요가 취소되었습니다.' : '좋아요 성공';

    return NextResponse.json({ message }, { status: 200 });
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
