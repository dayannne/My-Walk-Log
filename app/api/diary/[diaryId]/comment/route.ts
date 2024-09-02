import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { diaryId: string } },
) {
  const diaryId = parseInt(params.diaryId);
  const { content, authorId } = await req.json();

  try {
    const newComment = await prisma.comment.create({
      data: {
        diaryId,
        content,
        authorId,
      },
    });
    return NextResponse.json(newComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 },
    );
  }
}
