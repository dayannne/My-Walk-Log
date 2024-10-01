import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

export async function POST(request: Request, params: { userId: string }) {
  const userId = parseInt(params.userId);
  try {
    const body = await request.json();

    const {
      placeId,
      diaryImages,
      content,
      tags,
      weather,
      placeName,
      placeAddress,
      isPublic,
    } = body;

    if (!content || !weather) {
      return NextResponse.json(
        { message: '필수 필드를 모두 입력해 주세요.' },
        { status: 400 },
      );
    }

    const diary = await prisma.diary.create({
      data: {
        authorId: userId,
        placeId,
        diaryImages:
          typeof diaryImages === 'string'
            ? [diaryImages]
            : Array.isArray(diaryImages)
              ? diaryImages
              : [],
        content,
        weather,
        tags: tags || [],
        placeName,
        placeAddress,
        isPublic,
      },
    });

    return NextResponse.json(
      { message: '일기가 기록되었습니다.', data: diary },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { message: '중복된 값이 존재합니다.' },
          { status: 409 },
        );
      }
    }

    return NextResponse.json({ message: 'SERVER ERROR' }, { status: 500 });
  }
}
