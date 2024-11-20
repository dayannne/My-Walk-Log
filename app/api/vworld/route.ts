import { NextResponse } from 'next/server';
import axios from 'axios';

interface ApiResponse {
  data: any; // 외부 API 응답의 타입을 정의합니다. 예: { features: [...] }
  error?: string;
}

export async function GET(req: Request) {
  try {
    // 쿼리 파라미터를 URL에서 추출
    const url = 'https://api.vworld.kr/req/data';
    const { searchParams } = new URL(req.url);

    // axios를 사용해 외부 API 요청
    const response = await axios.get<ApiResponse>(url, {
      params: {
        service: searchParams.get('service'),
        request: searchParams.get('request'),
        data: searchParams.get('data'),
        key: searchParams.get('key'),
        size: searchParams.get('size'),
        format: searchParams.get('format'),
        errorformat: searchParams.get('errorformat'),
        geomfilter: searchParams.get('geomfilter'),
        attrfilter: searchParams.get('attrfilter'),
        domain: searchParams.get('domain'),
      },
    });

    // 외부 API 응답을 클라이언트로 전달
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    // 오류 발생 시 처리
    return NextResponse.json(
      { error: 'Failed to fetch data from external API' },
      { status: 500 },
    );
  }
}
