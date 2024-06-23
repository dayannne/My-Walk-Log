import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email } = await request.json();

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
}
