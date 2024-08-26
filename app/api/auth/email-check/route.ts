import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        {
          error: '유효한 이메일을 입력하세요.',
        },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json({
        isDuplicate: false,
        email,
        message: '사용 가능한 이메일입니다.',
      });
    } else {
      return NextResponse.json({
        isDuplicate: true,
        email,
        message: '이미 존재하는 이메일입니다.',
      });
    }
  } catch (error) {
    console.error('Error in email-check API:', error);
    return NextResponse.json(
      {
        error: '서버 오류가 발생했습니다. 나중에 다시 시도해주세요.',
      },
      { status: 500 },
    );
  }
}
