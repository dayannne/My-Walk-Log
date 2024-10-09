import { NextResponse } from 'next/server';
import prisma from '@/prisma/context';

export async function DELETE(
  req: Request,
  { params }: { params: { commentId: string; userId: string } },
) {
  const commentId = parseInt(params.commentId);
  const userId = parseInt(params.userId);

  if (isNaN(commentId) || isNaN(userId)) {
    return NextResponse.json(
      {
        status: 'error',
        message: '유효하지 않은 장소 ID 또는 사용자 ID입니다.',
      },
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

    // 댓글 삭제
    await prisma.comment.delete({
      where: { id: commentId },
    });

    return NextResponse.json(
      { status: 'success', message: '댓글이 삭제되었습니다.' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: '서버 에러가 발생했습니다.' },
      { status: 500 },
    );
  }
}
