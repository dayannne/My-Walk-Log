import { NextResponse } from 'next/server';
import prisma from '@/prisma/context';
import { IPlaceInfo } from '@/app/shared/types/map';
import { kakaoInstance } from '@/app/api/_routes/axiosInstance';

export async function POST(request: Request) {
  try {
    const places: IPlaceInfo[] = await request.json();

    // upsert된 결과를 저장할 배열
    const upsertedPlaces = await Promise.all(
      places.map(async (place: IPlaceInfo) => {
        // 장소 상세 데이터 받아오기
        const placeDetailResponse = await kakaoInstance.get(
          `/main/v/${place.id}`,
        );
        const category = place.category_name.split(' > ').pop();

        // upsert 작업 수행 및 결과 반환
        return prisma.placeDetail.upsert({
          where: { id: place.id },
          create: {
            id: place.id,
            placeName: place.place_name,
            categoryName: category || '',
            address: place.address_name,
            roadAddress: place.road_address_name,
            distance: place.distance,
            x: place.x,
            y: place.y,
            findway: placeDetailResponse.data.findway || {},
            basicInfo: {
              tags: placeDetailResponse.data.basicInfo.tags,
              address: placeDetailResponse.data.basicInfo.address,
              phonenum: placeDetailResponse.data.basicInfo.phonenum,
            },
            mainphotourl: placeDetailResponse.data.basicInfo.mainphotourl || {},
            photo: placeDetailResponse.data.photo || {},
          },
          update: {
            placeName: place.place_name,
            categoryName: category || '',
            address: place.address_name,
            roadAddress: place.road_address_name,
            distance: place.distance,
            x: place.x,
            y: place.y,
            findway: placeDetailResponse.data.findway,
            basicInfo: {
              tags: placeDetailResponse.data.basicInfo.tags,
              address: placeDetailResponse.data.basicInfo.address,
              phonenum: placeDetailResponse.data.basicInfo.phonenum,
            },
            mainphotourl: placeDetailResponse.data.basicInfo.mainphotourl,
            photo: placeDetailResponse.data.photo,
          },
        });
      }),
    );

    return NextResponse.json(
      { status: 'success', data: upsertedPlaces },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: '서버 에러가 발생했습니다.' },
      { status: 500 },
    );
  }
}
