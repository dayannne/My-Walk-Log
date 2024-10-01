import { NextResponse } from 'next/server';
import prisma from '@/prisma/context';

export async function DELETE(
  req: Request,
  { params }: { params: { commentId: string } },
) {
  const id = parseInt(params.commentId);

  if (isNaN(id)) {
    return NextResponse.json(
      { message: '잘못된 commentId 입니다.' },
      { status: 400 },
    );
  }

  try {
    await prisma.comment.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: '댓글이 삭제되었습니다.' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: 'SERVER ERROR' }, { status: 500 });
  }
}
