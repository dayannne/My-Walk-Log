import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Image from 'next/image';
import { useModalStore } from '@/store/client/modal';
import { ITrail } from '@/shared/types/trail';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    minWidth: '320px',
    maxWidth: '540px',
    position: 'relative',
  },
}));

function TrailModal() {
  const { openInfo, handleCloseInfo } = useModalStore();

  if (!openInfo || typeof openInfo !== 'object') {
    return null;
  }

  const {
    WLK_COURS_FLAG_NM,
    WLK_COURS_NM,
    COURS_DC,
    COURS_LEVEL_NM,
    COURS_LT_CN,
    COURS_TIME_CN,
    LNM_ADDR,
    CVNTL_NM,
    TOILET_DC,
    OPTN_DC,
    ADIT_DC,
  } = openInfo as ITrail;

  return (
    <StyledDialog
      onClose={handleCloseInfo}
      aria-labelledby='customized-dialog-title'
      open={!!openInfo}
    >
      <div className='flex flex-col items-center justify-center gap-2 px-7 py-3'>
        <Image
          src='/icons/icon-marker.svg'
          alt='마커 이미지'
          width={80}
          height={80}
        />
        <div className='flex flex-col items-center'>
          <span className='text-lg font-medium'>{WLK_COURS_FLAG_NM}</span>
          {WLK_COURS_FLAG_NM !== WLK_COURS_NM && (
            <span className='text-base text-gray-600'>{WLK_COURS_NM}</span>
          )}
        </div>
        <div className='border-olive-green text-olive-green w-full rounded-xl border border-solid p-2 text-center text-sm'>
          {COURS_DC}
        </div>
        <div className='flex w-full flex-col gap-2 rounded-xl border border-solid border-gray-300 p-2 text-sm'>
          {/* 난이도 */}
          <div className='flex items-center gap-2'>
            <Image
              src='/icons/icon-level.svg'
              alt='산책 난이도'
              width={24}
              height={24}
            />
            <span>{COURS_LEVEL_NM}</span>
          </div>
          {/* 산책 거리 */}
          <div className='flex items-center gap-2'>
            <Image
              src='/icons/icon-distance.svg'
              alt='산책 거리'
              width={24}
              height={24}
            />
            <span>{COURS_LT_CN}</span>
          </div>
          {/* 산책 소요시간 */}
          <div className='flex items-center gap-2'>
            <Image
              src='/icons/icon-clock.svg'
              alt='산책 소요시간'
              width={24}
              height={24}
            />
            <span>{COURS_TIME_CN}</span>
          </div>
          {/* 주소 */}
          <div className='flex items-center gap-2'>
            <Image
              src='/icons/icon-place.svg'
              alt='주소'
              width={24}
              height={24}
            />
            <div className='flex flex-col gap-1'>
              <span>{LNM_ADDR}</span>
            </div>
          </div>
        </div>
        <div className='flex w-full flex-col gap-2 rounded-xl border border-solid border-gray-300 p-2 text-sm'>
          {/* 편의 시설 정보 */}
          {CVNTL_NM && (
            <div className='flex items-center'>
              <div className='flex w-[80px] items-center gap-[2px]'>
                <Image
                  src='/icons/icon-info.svg'
                  alt='편의시설'
                  width={24}
                  height={24}
                />
                <span className='shrink-0 text-xs font-medium text-gray-600'>
                  편의시설
                </span>
              </div>
              <span className='grow-0'>{CVNTL_NM}</span>
            </div>
          )}
          <div className='flex items-center'>
            <div className='flex w-[80px] items-center gap-[2px]'>
              <Image
                src='/icons/icon-toilet.svg'
                alt='화장실'
                width={24}
                height={24}
              />
              <span className='shrink-0 text-xs font-medium text-gray-600'>
                화장실
              </span>
            </div>
            <span className='grow-0'>{TOILET_DC}</span>
          </div>
          <div className='flex items-center'>
            <div className='flex w-[80px] items-center gap-[2px]'>
              <Image
                src='/icons/icon-water.svg'
                alt='물'
                width={24}
                height={24}
              />
              <span className='shrink-0 text-xs font-medium text-gray-600'>
                물
              </span>
            </div>
            <span className='grow-0'>{OPTN_DC}</span>
          </div>
        </div>

        <div className='overflow-hidden rounded-xl border border-solid border-gray-300'>
          <p className='bg-hover flex h-full max-h-56 w-full flex-col gap-1 overflow-y-scroll p-4'>
            {ADIT_DC.split('. ').map((str: string, idx: number) => (
              <React.Fragment key={idx}>
                {str.trim()}
                {idx !== ADIT_DC.split('. ').length - 1 && '.'}
                {idx !== ADIT_DC.split('. ').length - 1 && (
                  <>
                    <br />
                    <br />
                  </>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
      <div className='sticky bottom-0 flex justify-end border-t border-solid border-gray-200 bg-white px-4 py-3'>
        <button className='text-olive-green' onClick={handleCloseInfo}>
          닫기
        </button>
      </div>
    </StyledDialog>
  );
}

export default TrailModal;
