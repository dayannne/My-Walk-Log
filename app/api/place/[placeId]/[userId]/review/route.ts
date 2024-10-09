import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

export async function POST(
  request: Request,
  { params }: { params: { placeId: string; userId: string } },
) {
  const userId = parseInt(params.userId);
  const placeId = params.placeId;

  if (isNaN(userId) || !placeId) {
    return NextResponse.json(
      {
        status: 'error',
        message: '유효하지 않은 장소 ID 또는 사용자 ID입니다.',
      },
      {
        status: 400,
      },
    );
  }

  try {
    const body = await request.json();

    const {
      reviewImages,
      description,
      keywords,
      walkDuration,
      entryFee,
      placeName,
      placeAddress,
    } = body;

    if (!description || !walkDuration) {
      return NextResponse.json(
        {
          status: 'error',
          message: '필수 필드를 모두 입력해 주세요.',
        },
        {
          status: 400,
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
        authorId: userId,
        placeName,
        placeAddress,
      },
    });

    return NextResponse.json(
      {
        status: 'success',
        data: { ...review },
        message: '리뷰가 작성되었습니다.',
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          {
            status: 'error',
            message: '중복된 값이 존재합니다.',
          },
          {
            status: 409,
          },
        );
      }
    }

    return NextResponse.json(
      {
        status: 'error',
        message: '서버 에러가 발생했습니다.',
      },
      {
        status: 500,
      },
    );
  }
}
