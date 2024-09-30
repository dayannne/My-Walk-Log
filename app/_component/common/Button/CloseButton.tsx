import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const CloseButton = ({ onClose }: { onClose: () => void }) => {
  return (
    <button
      className='text-olive-green sm-md:right-3 absolute top-3 flex h-9 w-9 items-center justify-center rounded-lg border border-solid border-gray-400 bg-white px-2 py-1 text-sm lg:relative lg:top-4 lg:rounded-l-none lg:border-l-0'
      onClick={onClose}
    >
      <Image
        src={'/icons/icon-cancel.svg'}
        alt='취소 버튼'
        width={28}
        height={28}
      />
    </button>
  );
};

export default CloseButton;
