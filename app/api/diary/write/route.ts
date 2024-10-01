import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      authorId,
      placeId,
      diaryImages,
      content,
      tags,
      weather,
      placeName,
      placeAddress,
      isPublic,
    } = body;

    if (!authorId) {
      return new Response(
        JSON.stringify({
          message: '잘못된 요청 : 로그인 상태 / 장소 정보 확인',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    if (!content || !weather) {
      return new Response(
        JSON.stringify({
          message: '필수 필드를 모두 입력해 주세요.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const diary = await prisma.diary.create({
      data: {
        authorId,
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
      { data: diary, message: '일기가 기록되었습니다.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('일기 작성 오류:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return new Response(
          JSON.stringify({
            message: '중복된 값이 존재합니다.',
          }),
          {
            status: 409,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }
    }

    return new Response(
      JSON.stringify({
        message: '서버 내부 오류',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
