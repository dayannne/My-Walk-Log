import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { diaryId: string } },
) {
  const diaryId = parseInt(params.diaryId);
  const { content, authorId } = await req.json();

  if (isNaN(diaryId) || !content || typeof content !== 'string' || !authorId) {
    return NextResponse.json(
      {
        status: 'error',
        message: '유효한 입력 데이터를 제공하세요.',
      },
      { status: 400 },
    );
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        diaryId,
        content,
        authorId,
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
