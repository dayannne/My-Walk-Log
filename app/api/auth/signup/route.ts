import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import prisma from '@/app/lib/prisma';

export async function POST(request: Request) {
  const { username, email, password } = await request.json();

  try {
    // 중복 이메일 체크
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: '이미 가입된 이메일 주소입니다.' },
        { status: 400 },
      );
    }

    const hashedPassword = await hash(password, 10);

    // 회원가입 데이터 생성
    const newUser = await prisma.user.create({
      data: { username, email, hashedPassword },
    });

    // 비밀번호 제외한 사용자 정보 반환
    return NextResponse.json({
      data: {
        username: newUser.username,
        email: newUser.email,
        password: newUser.hashedPassword,
      },
      message: '회원가입에 성공했습니다.\n로그인 페이지로 이동합니다.',
    });
  } catch (error) {
    return NextResponse.json(
      { message: '회원가입 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
