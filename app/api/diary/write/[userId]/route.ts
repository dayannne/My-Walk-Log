import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } },
) {
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

    // 요청 검증
    if (isNaN(userId)) {
      return NextResponse.json(
        {
          status: 'error',
          message: '잘못된 요청: 로그인 상태 / 장소 정보 확인',
        },
        { status: 400 },
      );
    }

    if (!content || !weather) {
      return NextResponse.json(
        {
          status: 'error',
          message: '필수 필드를 모두 입력해 주세요.',
        },
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
      {
        status: 'success',
        message: '일기가 기록되었습니다.',
        data: { ...diary },
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          {
            status: 'error',
            message: '중복된 값이 존재합니다.',
          },
          { status: 409 },
        );
      }
    }

    return NextResponse.json(
      {
        status: 'error',
        message: '서버 에러가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
