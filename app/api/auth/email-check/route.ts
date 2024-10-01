import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // 유효한 이메일 체크
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { message: '유효한 이메일을 입력하세요.' },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 사용자가 존재하지 않는 경우 (사용 가능한 이메일)
    if (!user) {
      return NextResponse.json(
        {
          message: '사용 가능한 이메일입니다.',
          isDuplicate: false,
          email,
        },
        { status: 200 },
      );
    }
    // 사용자가 존재하는 경우 (이미 존재하는 이메일)
    else {
      return NextResponse.json(
        {
          message: '이미 존재하는 이메일입니다.',
          isDuplicate: true,
          email,
        },
        { status: 409 }, // 409 Conflict: 리소스가 이미 존재하는 경우
      );
    }
  } catch (error) {
    // 서버 에러 처리
    return NextResponse.json({ message: 'SERVER ERROR' }, { status: 500 });
  }
}
