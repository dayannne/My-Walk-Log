import * as bcrypt from 'bcrypt';
import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 이메일 및 비밀번호 입력 검증
    if (
      !email ||
      typeof email !== 'string' ||
      !password ||
      typeof password !== 'string'
    ) {
      return NextResponse.json(
        {
          status: 'error',
          message: '유효한 이메일과 비밀번호를 입력하세요.',
        },
        { status: 400 },
      );
    }

    // 이메일로 기존 사용자 확인
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          status: 'error',
          message: '아이디 및 비밀번호가 일치하지 않습니다.',
        },
        { status: 401 },
      );
    }

    // 패스워드 확인
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (isPasswordValid) {
      const { hashedPassword, ...userWithoutPass } = user;
      return NextResponse.json(
        {
          status: 'success',
          data: userWithoutPass,
          message: '로그인 성공',
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          status: 'error',
          message: '아이디 및 비밀번호가 일치하지 않습니다.',
        },
        { status: 401 },
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
