export interface ITrail {
  ESNTL_ID: string; // 필수 ID
  WLK_COURS_FLAG_NM: string; // 코스 플래그 이름 (예: 고양누리길)
  WLK_COURS_NM: string; // 코스 이름 (예: 고양행주 누리길)
  COURS_DC: string; // 코스 설명 (예: 상세 구간 설명)
  SIGNGU_NM: string; // 행정구역 이름 (예: 경기 고양시 덕양구)
  COURS_LEVEL_NM: string; // 코스 난이도 (예: 보통)
  COURS_LT_CN: string; // 코스 길이 범주 (예: 10~15Km미만)
  COURS_DETAIL_LT_CN: string; // 실제 코스 길이 (예: 11.9)
  ADIT_DC: string; // 추가 설명 (예: 역사적 배경 설명)
  COURS_TIME_CN: string; // 예상 소요 시간 (예: 3시간 30분)
  OPTN_DC?: string; // 선택적 옵션 설명 (예: 성라약수터)
  TOILET_DC?: string; // 화장실 위치 (예: 성라약수터, 행주산성)
  CVNTL_NM?: string; // 편의시설 (예: 매점없음)
  LNM_ADDR?: string; // 법정 주소 (예: 경기 고양시 덕양구 행주내동)
  COURS_SPOT_LA?: string; // 코스 좌표 (위도)
  COURS_SPOT_LO?: string; // 코스 좌표 (경도)
}
