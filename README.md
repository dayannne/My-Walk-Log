# 나의 산책일기
![image](https://github.com/user-attachments/assets/34c01929-52ce-4bc3-9602-7a9c06be21ba)

[**->서비스 바로가기🚶‍♀️‍➡️**](https://my-walk-log.vercel.app)

## 테스트 계정 🔓   
> ID:   
PW:   

<br/>

## 🔎 서비스 소개
> **‘내 집 앞 소소한 산책부터 본격적인 트래킹까지🚶‍♀️➡️’**  
> 산책을 사랑하는 이들을 위한 서비스, **나의 산책일기**입니다.  
> 그 날의 산책을 기록하고, 지도 검색을 통해 산책 장소 & 산책로를 손쉽게 발견하며,  
> 리뷰와 일기로 서로의 산책 경험을 나눌 수 있는 서비스입니다.

<br/>

- 📔 **산책 일기 쓰기**  
  산책 경험을 기록하는 일기 기능을 제공합니다.  공개 시 피드 페이지, 산책 장소 상세를 통해 공유되며, 댓글과 좋아요로 다른 사용자들과 소통할 수 있습니다.

- 📰 **피드**  
  피드에서 다른 사람들의 산책 일기와 인기 있는 장소를 확인할 수 있습니다. 

- 🔍 **산책 장소 검색하기**  
  사용자가 원하는 산책 장소를 검색할 수 있습니다. **카카오 지도 API 키워드 검색 기능 + 카테고리 필터링**을 통해 지역(도, 시, 구)과 산책길 종류(공원, 하천, 산, 호수 등)에 따라 장소를 찾을 수 있습니다.<br/>
현재 위치를 기반으로 다시 검색할 수 있으며, 산책 장소 카테고리별로도 검색이 가능하도록 했습니다.

- 📍 **산책 장소 상세보기**  
  선택한 산책 장소에 대한 상세 정보를 확인할 수 있습니다. <br/>
  사용자는 해당 장소를 즐겨찾기에 추가하거나, 리뷰 작성 및 관련된 리뷰를 볼 수 있습니다. 공개된 산책 일기도 함께 확인할 수 있습니다.
 
- 🚶‍♂️ **산책로 검색하기**  
  산책로 오픈 데이터를 기반으로 산책로를 검색해 산책 코스 경로, 길이, 시간, 편의시설 정보에 대한 결과를 제공합니다. 

<br/>

## 🤔💭 개발 의도

- 산책이 취미인 한 사람으로서, 그 날 그 날의 산책 경험을 일기처럼 남기고 + 내 주변의 산책 장소를 쉽게 찾을 수 있는 서비스를 만들고 싶었습니다. 이에 더해 자신의 산책 경험을 공유할 수 있는 공간까지 제공해보는 것이 목적이었습니다.
- 오픈 API를 활용할 기회를 만들고 싶었습니다. 실무에서 많이 활용하고 있는 **카카오 지도 API**부터 **공공데이터**까지, 다양하게 활용해서 API 문서를 많이 읽어보고, 또 프로젝트에 남겨보고 싶었습니다.
- 백엔드 없이, Next.js를 활용하여 서버리스 환경에서의 SSR(서버사이드 렌더링) 프로젝트를 경험해보고 싶었습니다. 최신 기술에 대한 이해를 높이고, 실제 배포 환경에서의 효율성을 체험하고 싶었습니다.

<br/>

## 🔧 주요 Tech Stack

- **Next.js 14** 🌐  
  서버사이드 렌더링(SSR)을 통해 페이지 로딩 속도를 최적화하고 SEO를 적용하고 싶어 선택했습니다. Next.js 14의 App Router로 직관적으로 폴더 구조를 구성하고 레이아웃, 데이터 페칭을 쉽게 구현할 수 있었습니다.
- **Prisma** 🛠️  
  TypeScript를 지원하는 ORM(Object-Relational Mapping)이고, 타입 안전성과 쿼리 작성 시 자동 완성 기능 등 데이터베이스 스키마를 쉽게 정의하고 관리할 수 있어 선택했습니다.
- **Vercel Postgres** 🗄️  
  Vercel 플랫폼에 최적화된 데이터베이스로, 프로젝트를 Vercel에 배포함에 따라 + Prisma를 통해 데이터베이스와의 연결이 간편해 접근하기 쉬워 선택했습니다. 
- **TanStack Query** 🔄  
  서버 상태 관리 라이브러리로, 비동기 데이터 페칭 및 캐싱을 간편하게 처리할 수 있는 특징에 더해, 특히 prefetch 기능을 Next.js에 활용하면 사용자가 다음에 필요로 할 데이터를 미리 로드하여 페이지 전환 시 지연 없이 즉각적인 응답을 제공할 수 있다는 점으로 인해 선택했습니다.
- **Zustand** 📦  
  경량의 상태 관리 라이브러리로, React Context API보다 더 직관적이고 간단한 API를 제공하여 애플리케이션 상태를 쉽게 관리할 수 있어 선택했습니다.
- **React-Hook-Form** 📄  
  React 애플리케이션에서 폼 관리를 간편하게 해주는 라이브러리로, 유효성 검사에 있어 적은 리렌더링으로도 최적화된 사용자 경험을 제공하기 때문에 선택했습니다.
- **AWS S3** ☁️  
  프로젝트에서 필요로 하는 이미지 및 파일을 저장하고, Pre-signed URL을 통해 이미지를 쉽게 불러올 수 있도록 활용하였습니다. 

<br/>

## 👩🏻‍💻 개발 내용

### 1. Prisma와 Serverless SQL(Vercel Postgres)을 활용한 스키마 정의 및 DB 설계/구축

- 여러 유저가 동시에 오픈 데이터에 접근하고 효율적으로 관리할 수 있도록, 오픈 데이터 CSV 파일을 DB에 저장하는 로직을 구현했습니다. (🔗[관련 글 보러가기](https://velog.io/@day_1226/Next.js-TS-csv-파일-prisma로-db에-저장하기))

### 2. Tanstack Query Prefetching&Hydration 적용으로 데이터 로딩 속도 최대 66% 개선

### 3. 카카오 지도 API를 활용한 지도 구현
![image 1](https://github.com/user-attachments/assets/7011241a-ebf3-40c0-83c8-6626b94b27a7)
지도 오픈 API 문서 분석을 바탕으로 현재 위치 재검색, 카테고리 검색, 마커 및 클러스터링 등의 지도 관련 기능을 구현하며, 실제 지도 서비스처럼 제공할 수 있는 다양한 기능을 모색하고 시도해보는 계기가 되었습니다. ([🔗관련 글 보러가기](https://velog.io/@day_1226/Next.js-TS-csv-파일-prisma로-db에-저장하기))
`Map`, `Marker`, `Marker Clusterer`, `keyword`, `location` 등 지도를 구성하고 지도를 활용하는 데에 필요한 관련 데이터를 `UseMemo`로 관리하고, `useContext`를 통한 `MapProvider` 모듈로 지도가 사용되는 레이아웃에서 효율적으로 데이터를 핸들링할 수 있도록 구현했습니다.
- `Marker`:  
  산책 장소명이 포함된 마커를 지도상에 표시한 후, 클릭 시 포인터 이동 및 장소 상세 페이지를 불러올 수 있도록 구현하였습니다.
  ![%EB%A7%88%EC%BB%A4_%ED%81%B4%EB%A6%AD_%EC%9D%B4%EB%B2%A4%ED%8A%B8](https://github.com/user-attachments/assets/05b4b818-4215-4305-9847-7f0542c18ad2)
- `Marker Clusterer`:  
  마커 클러스터링 기능을 통해 지도 줌인에 따라 지도에 표시된 마커들을 그룹화하여 정리된 형태로 보여줄 수 있도록 구현하였습니다. 클러스터러 클릭 시 해당 인접 장소를 확대하여 쉽게 탐색할 수 있습니다.
- 지도 위치에 해당하는 지역 주소 표시
  주소 - 좌표간 변환 객체를 생성해주는 `Geocoder`를 활용해 지도 드래그 이동 시 해당 지역의 주소를 표시해 주었습니다.<br/>
  <img width="500" alt="image 2" src="https://github.com/user-attachments/assets/33a9b000-58dc-4036-b210-b5fcdf1b9658">
- **현재 위치로 지도 이동**
  초기 로딩 시 사용자의 위치 정보에 따라 현재 위치로 이동하는 기능을 구현했습니다.<br/>  
  <img width="500" alt="image 2" src="https://github.com/user-attachments/assets/4ab1c8c3-dd78-4a77-a3d7-aaf1b2df1a18">
  
### 4. 산책 장소 검색하기
- **카카오 지도 API ‘키워드로 검색하기’ & 커스텀 필터링 적용**
  키워드로 검색하기를 통해 반환된 데이터의 카테고리 정보 수집을 바탕으로 커스텀 필터링을 적용하여 산책 관련 장소 데이터를 선별했습니다. ([🔗 관련 글 보러가기](https://velog.io/@day_1226/Next.js-TS-Kakao-%EC%9E%A5%EC%86%8C-%EA%B2%80%EC%83%89-%EA%B2%B0%EA%B3%BC%EB%A5%BC-%EC%9B%90%ED%95%98%EB%8A%94-%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC%EB%A1%9C-%ED%95%84%ED%84%B0%EB%A7%81%ED%95%98%EA%B8%B0))
- **현재 위치에서 재검색**<br/>
  <img width="500" alt="image 2" src="https://github.com/user-attachments/assets/6c5104ba-21a0-4ef8-9b37-dd0f2708ff2c"><br/>
  검색 결과 반환 후 지도 이동 시 변경된 Map 객체의 center location을 기준으로 검색 결과를 재요청하는 기능을 구현하였습니다. 
- **카테고리 검색**  
  <img width="300" alt="image 3" src="https://github.com/user-attachments/assets/4b4b9b78-2a1e-47d2-b4f1-bc1920297102"><br/>
  산책 장소 종류에 따라 지도 위치 기반으로 검색할 수 있는 카테고리 검색 기능을 구현했습니다.

### 4. 산책 장소 상세 보기
![image](https://github.com/user-attachments/assets/ad57cb57-e13b-4e19-9bf3-f268546315c0)
기존 지도 서비스의 UI/UX를 참고하여, 산책 장소에 대한 상세 정보를 보여주는 상세 보기 기능을 구현했습니다. 해당 장소 데이터에 등록된 리뷰와 일기데이터를 함께 볼 수 있도록 했습니다.

### 5. 산책로 검색하기
오픈 데이터인 ‘내 주변 산책로 데이터’를 활용하여 산책로 정보를 데이터베이스(DB)로 관리하고, 사용자가 검색을 통해 산책로를 조회할 수 있는 기능을 구현하였습니다.<br/>
또한, 장소 클릭 시 해당 산책 코스의 경로, 길이, 소요 시간, 편의시설 정보 등을 모달로 보여주는 기능을 추가하여 사용자가 원하는 산책로에 대한 상세 정보를 쉽게 확인할 수 있도록 했습니다.
![image 4](https://github.com/user-attachments/assets/5a2b8de8-90e6-4bac-9182-5c35a26a8d50)
- [내 주변 산책로 데이터](https://www.bigdata-culture.kr/bigdata/user/data_market/detail.do?id=9d4e73e0-41e6-11eb-af9a-4b03f0a582d6)

### 6. 읍면동 주소 검색하기
프로필에 사용자의 읍면동 ‘동네 정보’를 저장하기 위해, 
읍면동 2D 데이터 오픈 API와 법정동 코드 오픈 데이터를 활용하여 검색 결과를 법정동 코드로 반환한 후, 오픈 API에서 폴리곤 데이터를 받아 해당 동네의 경계 지도를 시각화하는 기능을 구현했습니다.
- [읍면동 API](https://www.vworld.kr/dev/v4dv_2ddataguide2_s002.do?svcIde=ademd)
- [법정동코드](https://www.data.go.kr/data/15123287/fileData.do)

### 7. 일기 
- **일기 작성하기**
  - React-Hook-Form을 이용해 필수로 작성하는 폼에 대한 유효성 검사를 진행했습니다.</p>
  - 사진 등록 후 업로드 시 AWS S3에 저장하고 pre-signed URL을 받아오는 로직을 구현했습니다.</p>
  - 장소 등록하기 - 산책한 장소를 남기고 싶을 때 장소 검색 기능을 통해 장소를 추가하고 미니 지도로 해당 장소가 맞는지 확인할 수 있는 기능을 구현했습니다.
  <br/>
  <img width="200" alt="image 3" src="https://github.com/user-attachments/assets/b7b58ad4-fa38-4652-a934-477143eb5d6e" style="margin-right: 20px;" />
  <br/>

- **일기 보기 & 일기 상세**
  일기 작성 후 마이 페이지에서 일기를 날짜별로 확인할 수 있습니다.
  | ![image 5](https://github.com/user-attachments/assets/1ec1ee48-f71f-4c0e-896f-606553f2efed) | ![image 6](https://github.com/user-attachments/assets/693770bc-2c7f-4f46-9d42-221b3bc95210) | ![일기 상세](https://github.com/user-attachments/assets/775b1081-665a-4e1b-9072-bfaf399d85b8) |
  |:---:|:---:|:---:|
  | 일기 상세 페이지에서 상세 일기 정보 확인 및 댓글 기능을 통해 댓글 공개 설정 시 다른 유저들과 소통할 수 있는 기능을 추가했습니다. | 일기 공개 시 피드 페이지에 카드 형태로 작성할 일기가 노출됩니다. | 일기 작성 후 마이 페이지에서 일기를 날짜별로 확인할 수 있습니다. |
  
### 8. PC-모바일 반응형 UI 구현
Tailwind CSS를 활용하여 PC와 모바일 환경 모두를 위한 반응형 UI를 구현했습니다. <br/>
디바이스에 맞추어 유연하게 지도 레이아웃이 조정되도록 설계하였으며, 장소 클릭 시 표시되는 모달 또한 모바일 환경에서 화면에 맞게 확장되어 편의성을 높였습니다.
| ![image](https://github.com/user-attachments/assets/5a3e67cc-f586-4b87-a4ab-b37a0e93c9e2) | ![image](https://github.com/user-attachments/assets/71b77a20-1f4c-4d1e-8dfd-6113c0bd02a0) |
|:---:|:---:|
| ![image 9](https://github.com/user-attachments/assets/f625d022-943f-4ccb-8016-2288d3329a74) | ![image 10](https://github.com/user-attachments/assets/097a3252-b1e8-49ef-9bbd-6de83ba05548) |

<br/>

## 아쉬운 점
- 운영계 / 개발계 DB 분리의 어려움
    실무처럼 기능을 테스트하고 변경 사항을 반영하는 개발계 / 실제 사용자 데이터를 다룰 수 있는 운영계 DB를 분리해 관리하고 싶었으나 DB사용의 한계로 구현하지 못한 점이 아쉬웠습니다. 
    
- 산책로 세부 기능 제공
    산책로 관련 활용할 수 있는 오픈 데이터가 제한적이어서 코스의 경로를 시각화해 보여주거나 세부 정보를 충분히 반영하지 못한 점이 아쉬웠습니다.

<br/>

## 🛠️ TroubleShooting
### 1. 산책 가능한 장소 필터링 문제 (🔗관련 글 보러가기)
- ⚠️ 문제
  Kakao 지도 API 에서는 '키워드로 장소 검색' 기능과 더불어 '카테고리별 장소 검색'기능을 제공하고 있으나,<br/>
  ‘카테고리별 장소 검색’ 기능의 경우 제공하는 카테고리의 제한이 있었고, ‘키워드로 장소 검색’은 기본적으로 검색한 키워드와 관련하여 광범위한 결과를 제공하는 문제로 받아오고자 하는 산책 장소 데이터를 선별하는 데에 어려움이 있었습니다.
- 💡 해결
  ```json
  {
    "address_name": "서울 성동구 성수동1가 678-1",
    "category_group_code": "",
    "category_group_name": "",
    "category_name": "여행 > 공원 > 도시근린공원",
    "distance": "28619",
    "id": "11331488",
    "phone": "02-460-2905",
    "place_name": "서울숲",
    "place_url": "http://place.map.kakao.com/11331488",
    "road_address_name": "",
    "x": "127.037617759165",
    "y": "37.5443222301513"
  }
  ```
  여러 데이터의 반환 형태를 확인하며 장소마다의 하위 카테고리를 수집해 보았습니다.
  모두 `여행` > `관광,명소` > `하천` / `여행` > `공원` > `도시근린공원`과 같이 카테고리가 분류되어 있는 것을 볼 수 있었고, 산책에 적합한 장소의 특성을 고려하여 다음과 같이  카테고리 필터를 설정했습니다.
  ```ts
  export const FILTER_CATEGORIES = [
  '도보여행',
  '둘레길',
  '하천',
  '공원',
  '도시근린공원',
  '국립공원',
  '도립공원',
  '산',
  '오름',
  '호수',
  '저수지',
  '수목원,식물원',
  ];
  ```
  그 후, 검색 결과 데이터를 필터링하여 특정 키워드에 맞는 장소만 반환하도록 아래와 같이 필터링 함수를 구현 및 적용하는 것으로 해결하였습니다.
  ```ts
  export const filterPlacesByKeyword = (places: IPlace[]) => {
  return places.filter((place) => {
    const categories = place.category_name.split(` > `);

    return FILTER_CATEGORIES.some((keyword) => categories.includes(keyword));
  });
  };
  ```
### 2. 페이지 로딩 시간이 늦어지는 문제
- ⚠️ 문제
  SSR의 특징 중 초기 페이지 렌더링 시 걸리는 시간 + fetching 시간으로 인해 페이지 로딩이 무척 늦어지는 부분을 발결했습니다.
- 💡 해결
  React-Query에서 제공하는 기능 중 서버에서 미리 데이터를 fetching하고 이를 queryClient(클라이언트)로 넘겨주는 
  `prefetch`와 `HydrationBoundary`를 서버 컴포넌트에 적용했습니다.
  ```tsx
     //diary/[diaryId]/layout.tsx
  const DiaryLayout = async ({ children, params }: DiaryLayoutProps) => {
   const queryClient = new QueryClient();
  
    await queryClient.prefetchQuery({
      queryKey: ['diaryDetail', Number(params?.diaryId)],
      queryFn: () => getDiaryDetail(Number(params?.diaryId)),
    });
  
    return (
      <div className='flex basis-full flex-col overflow-y-auto'>
        <Header title='일기 상세' enableBackButton />
        <HydrationBoundary state={dehydrate(queryClient)}>
          {children}
        </HydrationBoundary>
      </div>
    );
   
    }
  ```
  `useQuery`가 사용되는 하위 컴포넌트 부분(클라이언트 컴포넌트)을 `HydrationBoundary`으로 감싼 후, 하위에서는 기존대로 `useQuery/useSuspenseQuery`를 적용했습니다.
  <details> 
    <summary>useInfiniteQuery를 사용하는 경우에는 다음과 같이 prefetchInfiniteQuery를 적용했습니다.</summary>
  
    ```tsx
    const FeedLayout = async ({ children }: FeedLayoutProps) => {
      const queryClient = new QueryClient();
      await queryClient.prefetchInfiniteQuery({
        queryKey: ['feed'],
        queryFn: () => getFeed(1),
        getNextPageParam: (lastPage: any) => {
          const { page, totalPages } = lastPage;
          return page < totalPages ? page + 1 : undefined;
        },
        initialPageParam: 1,
        retry: 1,
        staleTime: 60 * 1000,
      });
    
      queryClient.setQueryData(['feed'], {
        pages: (queryClient.getQueryData(['feed']) as FeedData)?.pages || [],
        pageParams: [0],
      });
    
      return (
        <div
          className={`sm-md:overflow-y-hidden relative z-20 flex w-full shrink-0 basis-full flex-col bg-white lg:flex lg:w-96 lg:min-w-96 lg:basis-auto`}
        >
          <div className='flex h-full w-full basis-full flex-col'>
            <Header title='피드' />
            <div className='flex basis-full flex-col overflow-y-scroll'>
              <HydrationBoundary
                state={JSON.parse(JSON.stringify(dehydrate(queryClient)))}
              >
                {children}
              </HydrationBoundary>
            </div>
          </div>
        </div>
      );
    };
    ```
  </details> 
  
  적용 결과, fetching 후 데이터 로딩까지의 시간이 최대 **66%**까지 단축된 것을 확인할 수 있었습니다.<br/>
  아래는 fetching 후 가장 페이지 내 마지막 데이터를 렌더링하기까지의 시간을 비교한 결과입니다.<br/>
  | **prefetch 적용 전 (4~5초)** | **prefetch 적용 후 (1초대)** |
  |:---:|:---:|
  | ![image 13](https://github.com/user-attachments/assets/a8c782fe-1b09-46fa-b4e8-be760634052f) <br> 이미지 기준 5.73초 | ![image 14](https://github.com/user-attachments/assets/b59eb2f9-43c4-4157-a845-244983b8b2cf) <br> 1.21초 <br> ![image 15](https://github.com/user-attachments/assets/fa9ac6fb-a67f-4359-937a-e3fa1e2b4c86) <br> 1.53초 |
