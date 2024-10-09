import { NextResponse } from 'next/server';
import prisma from '@/prisma/context';
import { kakaoInstance } from '@/app/api/_routes/axiosInstance';

export async function POST(request: Request) {
  try {
    const places: kakao.maps.services.PlacesSearchResult = await request.json();
    const upsertedPlaces = []; // 결과를 저장할 배열

    for (const place of places) {
      try {
        // 장소 상세 데이터 받아오기
        const placeDetailResponse = await kakaoInstance.get(
          `/main/v/${place.id}`,
        );

        const category = place.category_name.split(' > ').pop();

        // upsert 작업 수행
        const upsertedPlace = await prisma.placeDetail.upsert({
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
              tags: placeDetailResponse.data.basicInfo.tags || null,
              address: placeDetailResponse.data.basicInfo.address || null,
              phonenum: placeDetailResponse.data.basicInfo.phonenum || null,
              homepage: placeDetailResponse.data.basicInfo.homepage || null,
              openHour: placeDetailResponse.data.basicInfo.openHour || null,
              facilityInfo:
                placeDetailResponse.data.basicInfo.facilityInfo || null,
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
            findway: placeDetailResponse.data.findway || {},
            basicInfo: {
              tags: placeDetailResponse.data.basicInfo.tags || null,
              address: placeDetailResponse.data.basicInfo.address || null,
              phonenum: placeDetailResponse.data.basicInfo.phonenum || null,
              homepage: placeDetailResponse.data.basicInfo.homepage || null,
              openHour: placeDetailResponse.data.basicInfo.openHour || null,
              facilityInfo:
                placeDetailResponse.data.basicInfo.facilityInfo || null,
            },
            mainphotourl: placeDetailResponse.data.basicInfo.mainphotourl || {},
            photo: placeDetailResponse.data.photo || {},
          },
        });

        upsertedPlaces.push(upsertedPlace); // 결과를 배열에 추가
      } catch (error) {
        continue;
      }
    }

    return NextResponse.json(
      { status: 'success', message: '장소 데이터 생성/업데이트 성공' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: '서버 에러가 발생했습니다.' },
      { status: 500 },
    );
  }
}
