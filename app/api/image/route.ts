import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

const Bucket = process.env.AMPLIFY_BUCKET;
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('img') as File[];

    // 파일 수가 3개를 초과할 경우
    if (files.length > 3) {
      return new Response(
        JSON.stringify({
          status: 'error',
          message: '업로드할 수 있는 이미지 파일의 수는 최대 3장입니다.',
        }),
        { status: 400 },
      );
    }

    const uploadPromises = files.map(async (file) => {
      const Body = Buffer.from(await file.arrayBuffer());
      const Key = file.name;
      const ContentType = file.type || 'image/jpg';

      // S3에 파일 업로드
      await s3.send(
        new PutObjectCommand({
          Bucket,
          Key,
          Body,
          ContentType,
        }),
      );

      return `https://${Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${Key}`;
    });

    const imgUrls = await Promise.all(uploadPromises);

    return new Response(
      JSON.stringify({
        status: 'success',
        data: [...imgUrls],
        message: '파일이 성공적으로 업로드되었습니다.',
      }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 'error',
        message: '서버 에러가 발생했습니다.',
      }),
      { status: 500 },
    );
  }
}
