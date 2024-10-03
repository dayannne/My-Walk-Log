import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { diaryId: string; userId: string } },
) {
  const diaryId = parseInt(params.diaryId);
  const userId = parseInt(params.userId);
  const { content } = await req.json();

  if (isNaN(diaryId) || isNaN(userId)) {
    return NextResponse.json(
      {
        status: 'error',
        message: '유효하지 않은 장소 ID 또는 사용자 ID입니다.',
      },
      { status: 400 },
    );
  }

  if (!content || typeof content !== 'string') {
    return NextResponse.json(
      {
        status: 'error',
        message: '유효한 댓글 내용을 입력하세요.',
      },
      { status: 400 },
    );
  }

  try {
    // 댓글 생성
    const newComment = await prisma.comment.create({
      data: {
        diaryId,
        content,
        authorId: userId,
      },
    });

    return NextResponse.json(
      {
        status: 'success',
        data: newComment,
        message: '댓글이 성공적으로 생성되었습니다.',
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: '서버 에러가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
