import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

export async function POST(
  request: Request,
  { params }: { params: { placeId: string; userId: string } },
) {
  const userId = parseInt(params.userId);
  const placeId = params.placeId;

  if (!userId || !placeId) {
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

  try {
    const body = await request.json();

    const { reviewImages, description, keywords, walkDuration, entryFee } =
      body;

    if (!description || !walkDuration) {
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

    const review = await prisma.review.create({
      data: {
        reviewImages: reviewImages || [],
        description,
        keywords: keywords || [],
        walkDuration,
        entryFee: entryFee || null,
        placeId,
        placeDetailId: placeId,
        authorId: userId,
      },
    });

    return NextResponse.json(
      { data: review, message: '리뷰가 성공적으로 작성되었습니다.' },
      { status: 201 },
    );
  } catch (error) {
    console.error('리뷰 작성 오류:', error);

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
