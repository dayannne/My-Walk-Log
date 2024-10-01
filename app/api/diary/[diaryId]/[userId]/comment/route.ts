import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { diaryId: string; userId: string } },
) {
  const diaryId = parseInt(params.diaryId);
  const userId = parseInt(params.userId);
  const { content } = await req.json();

  try {
    if (!content) {
      return NextResponse.json(
        { message: '댓글 내용 입력은 필수입니다.' },
        { status: 400 },
      );
    }

    // 다이어리 존재 여부 확인
    const diaryExists = await prisma.diary.findUnique({
      where: { id: diaryId },
    });

    if (!diaryExists) {
      return NextResponse.json(
        { message: '존재하지 않는 일기입니다.' },
        { status: 404 },
      );
    }

    // 새로운 댓글 생성
    const newComment = await prisma.comment.create({
      data: {
        diaryId,
        content,
        authorId: userId,
      },
    });

    return NextResponse.json(
      {
        message: 'OK',
        data: newComment,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: 'SERVER ERROR' }, { status: 500 });
  }
}
