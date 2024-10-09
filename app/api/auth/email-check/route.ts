import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // 이메일 입력 검증
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        {
          status: 'error',
          message: '유효한 이메일을 입력하세요.',
        },
        { status: 400 },
      );
    }

    // 제공된 이메일로 기존 사용자 확인
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return NextResponse.json(
        {
          status: 'error',
          message: '이미 존재하는 이메일입니다.',
        },
        { status: 409 },
      );
    } else {
      return NextResponse.json(
        {
          status: 'success',
          data: {
            email,
            message: '사용 가능한 이메일입니다.',
          },
        },
        { status: 200 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: '서버 에러가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
