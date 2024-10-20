import { NextResponse } from 'next/server';
import prisma from '@/prisma/context';

export async function POST(
  request: Request,
  { params }: { params: { diaryId: string; userId: string } },
) {
  const diaryId = parseInt(params.diaryId);
  const userId = parseInt(params.userId);

  // 요청 검증
  if (isNaN(diaryId) || isNaN(userId)) {
    return NextResponse.json(
      {
        status: 'error',
        message: '유효하지 않은 일기 ID 또는 사용자 ID입니다.',
      },
      { status: 400 },
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

    // 일기 또는 사용자 확인
    if (!diary || !user) {
      return NextResponse.json(
        { status: 'error', message: '일기 또는 사용자를 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    // 일기 존재 여부 확인
    if (!diary) {
      return NextResponse.json(
        { message: '존재하지 않는 일기입니다.' },
        { status: 404 },
      );
    }

    // 사용자가 이미 좋아요를 눌렀는지 확인
    const userHasLiked = diary.likedBy.includes(userId);

    // 데이터베이스 업데이트
    await prisma.$transaction([
      prisma.diary.update({
        where: { id: diaryId },
        data: {
          likedBy: {
            set: userHasLiked
              ? diary.likedBy.filter((id) => id !== userId) // 좋아요 취소
              : [...diary.likedBy, userId], // 좋아요 추가
          },
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: {
          likedDiaries: {
            set: userHasLiked
              ? user.likedDiaries.filter((id) => id !== diaryId) // 좋아요 취소
              : [...user.likedDiaries, diaryId], // 좋아요 추가
          },
        },
      }),
    ]);

    const message = userHasLiked ? '좋아요가 취소되었습니다.' : '좋아요 성공';

    return NextResponse.json({ status: 'success', message }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: '서버 에러가 발생했습니다.' },
      { status: 500 },
    );
  }
}
