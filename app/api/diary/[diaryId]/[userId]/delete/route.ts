import { NextResponse } from 'next/server';
import prisma from '@/prisma/context';

export async function DELETE(
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
    // 일기 존재 확인
    const diary = await prisma.diary.findUnique({
      where: { id: diaryId },
    });

    // 일기 없을 경우
    if (!diary) {
      return NextResponse.json(
        { status: 'error', message: '일기를 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    // 권한 확인
    if (diary.authorId !== userId) {
      return NextResponse.json(
        { status: 'error', message: '권한이 없습니다.' },
        { status: 403 },
      );
    }

    // 일기 삭제
    await prisma.diary.delete({
      where: { id: diaryId },
    });

    return NextResponse.json(
      { status: 'success', message: '일기가 삭제되었습니다.' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: '서버 에러가 발생했습니다.' },
      { status: 500 },
    );
  }
}
