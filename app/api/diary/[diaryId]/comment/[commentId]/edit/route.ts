import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { commentId: string } },
) {
  const id = parseInt(params.commentId);
  const { content } = await req.json();

  // 댓글 ID 검증
  if (isNaN(id)) {
    return NextResponse.json(
      { status: 'error', message: '유효하지 않은 댓글 ID입니다.' },
      { status: 400 },
    );
  }

  // 댓글 내용 검증
  if (!content || typeof content !== 'string') {
    return NextResponse.json(
      { status: 'error', message: '유효한 댓글 내용을 입력하세요.' },
      { status: 400 },
    );
  }

  try {
    // 댓글 업데이트
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { content },
    });

    return NextResponse.json(
      {
        status: 'success',
        data: { ...updatedComment },
        message: '댓글이 수정되었습니다.',
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: '서버 에러가 발생했습니다.' },
      { status: 500 },
    );
  }
}
