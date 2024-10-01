import { NextResponse } from 'next/server';
import prisma from '@/prisma/context';

export async function DELETE(
  request: Request,
  { params }: { params: { diaryId: string; userId: string } },
) {
  const diaryId = parseInt(params.diaryId);
  const userId = parseInt(params.userId);

  // diaryId와 userId 유효성 검증
  if (isNaN(diaryId)) {
    return NextResponse.json(
      { message: '잘못된 diaryId 입니다.' },
      { status: 400 },
    );
  }

  try {
    // diary 존재 여부 확인
    const diary = await prisma.diary.findUnique({
      where: { id: diaryId },
    });

    if (!diary) {
      return NextResponse.json(
        { message: '존재하지 않는 일기입니다.' },
        { status: 404 },
      );
    }

    // 권한 확인
    if (diary.authorId !== userId) {
      return NextResponse.json(
        { message: '권한이 없습니다.' },
        { status: 403 },
      );
    }

    // diary 삭제
    await prisma.diary.delete({
      where: { id: diaryId },
    });

    return NextResponse.json(
      { message: '일기가 삭제되었습니다.' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: 'SERVER ERROR' }, { status: 500 });
  }
}
