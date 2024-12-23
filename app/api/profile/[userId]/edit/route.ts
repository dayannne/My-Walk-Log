import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';
import { IProfileReq } from '@/shared/types/profile';

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } },
) {
  const userId = parseInt(params.userId);

  try {
    // 요청으로부터 데이터 가져오기
    const profileData: IProfileReq = await request.json();

    // 사용자 존재 여부 확인
    const userExists = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!userExists) {
      return NextResponse.json(
        {
          status: 'error',
          message: '사용자를 찾을 수 없습니다.',
        },
        { status: 404 },
      );
    }

    // 사용자 정보 업데이트
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username: profileData.username,
        introduction: profileData.introduction,
        address: profileData.address
          ? JSON.parse(JSON.stringify(profileData.address))
          : null,
        profileImage: profileData.profileImage,
      },
    });
    const { hashedPassword, ...updatedUserWithoutPassword } = updatedUser;

    return NextResponse.json(
      {
        status: 'success',
        data: { ...updatedUserWithoutPassword },
        message: '프로필이 수정되었습니다.',
      },
      { status: 200 },
    );
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
