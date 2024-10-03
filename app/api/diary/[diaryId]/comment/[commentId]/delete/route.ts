import { NextResponse } from 'next/server';
import prisma from '@/prisma/context';

export async function DELETE(
  req: Request,
  { params }: { params: { commentId: string } },
) {
  const id = parseInt(params.commentId);

  // 댓글 ID 검증
  if (isNaN(id)) {
    return NextResponse.json(
      { status: 'error', message: '유효하지 않은 댓글 ID입니다.' },
      { status: 400 },
    );
  }

  try {
    // 댓글 삭제
    await prisma.comment.delete({
      where: { id },
    });
    return NextResponse.json(
      { status: 'success', message: '댓글이 삭제되었습니다.' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: '서버 내부 오류' },
      { status: 500 },
    );
  }
}
