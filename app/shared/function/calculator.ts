export function calculateCenter(coords: number[]) {
  // 좌표 배열에서 경도와 위도 추출
  const [lon1, lat1, lon2, lat2] = coords;

  // 중심 좌표 계산
  const centerX = (lon1 + lon2) / 2;
  const centerY = (lat1 + lat2) / 2;

  return {
    x: centerX,
    y: centerY,
  };
}
