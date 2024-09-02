import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { commentId: string } },
) {
  const id = parseInt(params.commentId);
  const { content } = await req.json();

  if (isNaN(id)) {
    return NextResponse.json(
      { error: '잘못된 댓글 ID입니다.' },
      { status: 400 },
    );
  }

  try {
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { content },
    });
    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    console.error('댓글 업데이트 오류:', error);
    return NextResponse.json(
      { error: '댓글 업데이트에 실패했습니다.' },
      { status: 500 },
    );
  }
}
