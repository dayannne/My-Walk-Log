import { NextResponse } from 'next/server';
import prisma from '@/prisma/context';

export async function DELETE(
  request: Request,
  { params }: { params: { diaryId: string; userId: string } },
) {
  const diaryId = parseInt(params.diaryId);
  const userId = parseInt(params.userId);

  if (isNaN(diaryId) || isNaN(userId)) {
    return new Response(
      JSON.stringify({
        message: '잘못된 요청',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  try {
    const diary = await prisma.diary.findUnique({
      where: { id: diaryId },
    });
    if (!diary) {
      return new Response(
        JSON.stringify({ message: '일기를 찾을 수 없습니다.' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }
    if (diary.authorId !== userId) {
      return new Response(JSON.stringify({ message: '권한이 없습니다.' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await prisma.diary.delete({
      where: { id: diaryId },
    });

    return NextResponse.json(
      { message: '일기가 삭제되었습니다.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ message: '서버 내부 오류' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
