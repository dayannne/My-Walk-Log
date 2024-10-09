import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import prisma from '@/prisma/context';

export async function POST(request: Request) {
  try {
    const { username, email, password, address } = await request.json();

    // 필수 입력 검증
    if (!username || !email || !password) {
      return NextResponse.json(
        { status: 'error', message: '이름, 이메일 및 비밀번호는 필수입니다.' },
        { status: 400 },
      );
    }

    const hashedPassword = await hash(password, 10);

    // 회원가입 데이터 생성
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        hashedPassword,
        profileImage: process.env.USER_DEFAULT_IMAGE,
        address: address,
      },
    });

    // 비밀번호 제외한 사용자 정보 반환
    return NextResponse.json(
      {
        status: 'success',
        data: {
          username: newUser.username,
          email: newUser.email,
          address: newUser.address,
        },
        message: '회원가입에 성공했습니다. 로그인 페이지로 이동합니다.',
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: '서버 에러가 발생했습니다.' },
      { status: 500 },
    );
  }
}
