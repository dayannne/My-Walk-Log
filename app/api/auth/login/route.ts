import { NextResponse } from 'next/server';
import prisma from '@/prisma/context';
import * as bcrypt from 'bcrypt';

interface RequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const { email, password }: RequestBody = await request.json();

    // 이메일과 비밀번호 필수 항목 확인
    if (!email || !password) {
      return NextResponse.json(
        { message: '이메일과 비밀번호를 입력해 주세요.' },
        { status: 400 },
      );
    }

    // 이메일이 존재하는지 확인
    const user = await prisma.user.findFirst({
      where: { email },
    });

    // 사용자 확인
    if (!user) {
      return NextResponse.json(
        { message: '아이디 및 비밀번호가 일치하지 않습니다.' },
        { status: 401 },
      );
    }

    // 패스워드 비교
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (isPasswordValid) {
      const { hashedPassword, ...userWithoutPass } = user;
      return NextResponse.json(
        {
          message: 'OK',
          data: { ...userWithoutPass },
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: '아이디 및 비밀번호가 일치하지 않습니다.' },
        { status: 401 },
      );
    }
  } catch (error) {
    return NextResponse.json({ message: 'SERVER ERROR' }, { status: 500 });
  }
}
