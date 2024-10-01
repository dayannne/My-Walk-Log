import prisma from '@/prisma/context';
import { NextResponse } from 'next/server';
import { IProfileReq } from '@/app/shared/types/profile';

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } },
) {
  const userId = parseInt(params.userId);

  try {
    // 요청으로부터 데이터 가져오기
    const profileData: IProfileReq = await request.json();

    // 사용자 정보 업데이트
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username: profileData.username,
        introduction: profileData.introduction,
        address: JSON.stringify(profileData.address) || {},
        profileImage: profileData.profileImage,
      },
    });

    return NextResponse.json(
      { message: 'OK', data: updatedUser },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: 'SERVER ERROR' }, { status: 500 });
  }
}
