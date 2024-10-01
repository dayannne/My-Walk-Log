import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import prisma from '@/prisma/context';

export async function POST(request: Request) {
  const { username, email, password, address } = await request.json();

  try {
    const hashedPassword = await hash(password, 10);

    // 회원가입 데이터 생성
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        hashedPassword,
        profileImage: process.env.USER_DEFAULT_IMAGE,
        address: address || {},
      },
    });

    // 비밀번호 제외한 사용자 정보 반환
    return NextResponse.json(
      {
        message: '회원가입에 성공했습니다.\n로그인 페이지로 이동합니다.',
        data: {
          username: newUser.username,
          email: newUser.email,
          address: newUser.address,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: 'SERVER ERROR' }, { status: 500 });
  }
}
