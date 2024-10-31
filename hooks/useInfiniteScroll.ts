import { useEffect } from 'react';

function useInfiniteScroll(
  loaderRef: React.RefObject<HTMLElement>,
  onLoadMore: () => void,
) {
  useEffect(() => {
    const loaderElement = loaderRef.current;

    if (!loaderElement) return;

    // IntersectionObserver 콜백 함수
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore(); // 요소가 뷰포트에 들어오면 onLoadMore 호출
        }
      },
      {
        root: null, // 뷰포트 기준으로 관찰
        rootMargin: '0px',
        threshold: 1.0, // 100% 요소가 보여야만 트리거
      },
    );

    observer.observe(loaderElement);

    // 클린업 함수: 컴포넌트가 언마운트될 때 관찰 중지
    return () => {
      if (loaderElement) {
        observer.unobserve(loaderElement);
      }
    };
  }, [loaderRef, onLoadMore]);
}

export default useInfiniteScroll;
