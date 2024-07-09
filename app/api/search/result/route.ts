import { NextResponse } from 'next/server';
import prisma from '@/prisma/context';
import { IPlace } from '@/app/shared/types/map';

import { kakaoInstance } from '../../_routes/axiosInstance';

export async function POST(request: Request) {
  try {
    let places: IPlace[] = await request.json();

    //  새로운 places 배열 생성
    const newPlaces = await Promise.all(
      places.map(async (place: IPlace) => {
        const existingPlace = await prisma.place.findUnique({
          where: { id: place.id },
        });

        if (!existingPlace) {
          //  장소 상세 데이터 받아오기
          const placeDetail = await kakaoInstance.get(`/main/v/${place.id}`);
          const category = place.category_name.split(` > `).pop();
          // 장소 데이터 생성
          await prisma.place.create({
            data: {
              id: place.id,
              categoryName: (category as string) || '',
              placeName: place.place_name,

              address: place.address_name,
              roadAddress: place.road_address_name,
              distance: place.distance,
              x: place.x,
              y: place.y,
              // 장소 상세 데이터 함께 생성(PlaceDetail DB에 저장됨)
              placeDetail: {
                create: {
                  id: place.id,
                  placeName: place.place_name,
                  placeDetail: { ...placeDetail.data },
                },
              },
            },
          });

          // findFirst로 모든 데이터 가져오기 (include로 관계 데이터 함께 로드)
          return await prisma.place.findFirst({
            where: { id: place.id },
            include: {
              reviews: true,
              placeDetail: true,
            },
          });
        } else {
          return await prisma.place.findFirst({
            where: { id: place.id },
            include: {
              reviews: true,
              placeDetail: true,
            },
          });
        }
      }),
    );

    return NextResponse.json({
      data: newPlaces,
      message: '데이터 생성 성공',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: '데이터 생성 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
