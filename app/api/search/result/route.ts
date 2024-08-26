import { NextResponse } from 'next/server';
import prisma from '@/prisma/context';
import { IPlace } from '@/app/shared/types/map';
import { kakaoInstance } from '../../_routes/axiosInstance';

export async function POST(request: Request) {
  try {
    const places: IPlace[] = await request.json();

    // 기존 장소 ID 목록 가져오기
    const existingPlaceIds = await prisma.place
      .findMany({
        where: { id: { in: places.map((place) => place.id) } },
        select: { id: true },
      })
      .then((places) => places.map((place) => place.id));

    // 새로운 장소 데이터 생성
    await Promise.all(
      places.map(async (place: IPlace) => {
        if (!existingPlaceIds.includes(place.id)) {
          // 장소 상세 데이터 받아오기
          const placeDetailResponse = await kakaoInstance.get(
            `/main/v/${place.id}`,
          );
          const category = place.category_name.split(` > `).pop();

          // 장소 데이터 생성
          await prisma.place.create({
            data: {
              id: place.id,
              categoryName: category || '',
              placeName: place.place_name,
              address: place.address_name,
              roadAddress: place.road_address_name,
              distance: place.distance,
              x: place.x,
              y: place.y,
              placeDetail: {
                create: {
                  id: place.id,
                  placeName: place.place_name,
                  placeDetail: {
                    findway: placeDetailResponse.data.findway,
                    basicInfo: placeDetailResponse.data.basicInfo,
                    photo: placeDetailResponse.data.photo,
                  },
                },
              },
            },
          });
        }
      }),
    );

    // 모든 장소 정보 가져오기 (기존 장소 포함)
    const allPlaces = await prisma.place.findMany({
      where: { id: { in: places.map((place) => place.id) } },
      include: {
        reviews: true,
        diaries: true,
        placeDetail: true,
      },
    });

    return NextResponse.json({
      data: allPlaces,
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
