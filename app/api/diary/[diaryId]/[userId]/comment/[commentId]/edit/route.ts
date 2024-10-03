import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { commentId: string; userId: string } },
) {
  const commentId = parseInt(params.commentId);
  const userId = parseInt(params.userId);
  const { content } = await req.json();

  if (isNaN(commentId) || isNaN(userId)) {
    return NextResponse.json(
      {
        status: 'error',
        message: '유효하지 않은 댓글 ID 또는 사용자 ID입니다.',
      },
      { status: 400 },
    );
  }

  if (!content || typeof content !== 'string') {
    return NextResponse.json(
      { status: 'error', message: '유효한 댓글 내용을 입력하세요.' },
      { status: 400 },
    );
  }

  try {
    // 댓글 확인 및 작성자 검증
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return NextResponse.json(
        { status: 'error', message: '댓글을 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    if (comment.authorId !== userId) {
      return NextResponse.json(
        { status: 'error', message: '권한이 없습니다.' },
        { status: 403 },
      );
    }

    // 댓글 업데이트
    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
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
