import * as bcrypt from 'bcrypt';
import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

interface RequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const { email, password }: RequestBody = await request.json();

  // 이메일이 존재하는지 확인
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: '아이디 및 비밀번호가 일치하지 않습니다.' },
      { status: 404 },
    );
  }

  // 패스워드도 동일한지 확인
  if (user && (await bcrypt.compare(password, user.hashedPassword))) {
    const { hashedPassword, ...userWithoutPass } = user;
    return NextResponse.json({
      data: { ...userWithoutPass },
      message: '로그인 성공',
    });
  } else
    return NextResponse.json(
      { message: '아이디 및 비밀번호가 일치하지 않습니다.' },
      { status: 404 },
    );
}
