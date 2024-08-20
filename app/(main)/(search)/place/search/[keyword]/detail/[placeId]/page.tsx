'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import PlaceFindWayInfo from '@/app/_component/place/PlaceFindWayInfo';
import { useGetPlace } from '@/app/store/server/place';
import PleceReviewSummary from '@/app/_component/place/PleceReviewSummary';
import { usePlaceMenuStore, usePlaceStore } from '@/app/store/client/place';
import { useEffect } from 'react';
import { useGetReviews } from '@/app/store/server/review';
import ReviewList from '@/app/_component/review/ReviewList';
import { useGetDiary } from '@/app/store/server/diary';
import DiaryList from '@/app/_component/diary/DiaryList';
import EmptyDiaries from '@/app/_component/diary/EmpryDiaries';
import EmptyReviews from '@/app/_component/review/EmptyReviews';
import PlaceDiaryAlbum from '@/app/_component/place/PlaceDiaryAlbum';

const PlaceDetailPage = ({ params }: { params: { placeId: string } }) => {
  const { placeId } = params;
  const { setPlace } = usePlaceStore();
  const { placeMenu } = usePlaceMenuStore();
  const placeQueryOptions = useGetPlace(placeId);
  const reviewQueryOptions = useGetReviews(placeId);
  const diaryQueryOptions = useGetDiary(placeId);
  const { data: place } = useSuspenseQuery(placeQueryOptions);
  const { data: reviews } = useSuspenseQuery(reviewQueryOptions);
  const { data: diaries } = useSuspenseQuery(diaryQueryOptions);

  useEffect(() => {
    if (place) {
      setPlace(place);
    }
  }, [place, setPlace]);

  return (
    <>
      {/* 정보 */}
      {placeMenu === 0 && (
        <>
          {/* 4. 일기 */}
          <PlaceDiaryAlbum placeId={placeId} place={place} />
          {/* 5. 리뷰 */}
          <PleceReviewSummary placeId={placeId} place={place} />
          {/* 6. 찾아가는 길 */}
          <PlaceFindWayInfo place={place} />
        </>
      )}
      {/* 리뷰 */}
      {placeMenu === 1 && (
        <>
          {diaries?.length === 0 ? (
            <EmptyReviews placeId={placeId} />
          ) : (
            <ReviewList reviews={reviews} type='PLACE' />
          )}
        </>
      )}
      {/* 일기 */}
      {placeMenu === 2 && (
        <>
          {diaries?.length === 0 ? (
            <EmptyDiaries />
          ) : (
            <DiaryList diaries={diaries} />
          )}
        </>
      )}
    </>
  );
};

export default PlaceDetailPage;
