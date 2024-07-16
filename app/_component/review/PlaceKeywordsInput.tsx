'use client';

import { PLACE_KEYWORDS } from '@/app/shared/constant';

interface pageProps {
  placeKeywords: string[];
  setPlaceKeywords: React.Dispatch<React.SetStateAction<string[]>>;
}

const PlaceKeywordsInput = ({ placeKeywords, setPlaceKeywords }: pageProps) => {
  const handleToggle = (key: string) => {
    if (placeKeywords.includes(key)) {
      setPlaceKeywords(placeKeywords.filter((item) => item !== key));
    } else if (placeKeywords.length < 5) {
      setPlaceKeywords([...placeKeywords, key]);
    } else {
      alert('최대 5개까지 선택할 수 있습니다.');
    }
  };

  return (
    <div className='box-content flex h-full max-h-60 grow-0 flex-col overflow-y-scroll rounded-lg border border-solid border-gray-500 px-4 py-3'>
      {Object.entries(PLACE_KEYWORDS).map(([category], idx: number) => (
        <div key={category}>
          <div key={category} className='flex flex-col gap-1'>
            <span className='font-medium'>
              <span>{category}</span>
            </span>
            <ul className='flex flex-col gap-2'>
              {Object.entries(PLACE_KEYWORDS[category]).map(([key, value]) => (
                <li key={key}>
                  <label className='flex items-center'>
                    <input
                      type='checkbox'
                      checked={placeKeywords.includes(key)}
                      onChange={() => handleToggle(key)}
                      className='hidden'
                    />
                    <span
                      className={`hover:bg-hover cursor-pointer rounded-md border border-solid border-gray-300 px-2 py-1 text-sm shadow-sm ${
                        placeKeywords.includes(key)
                          ? 'bg-olive-green text-white'
                          : 'bg-white text-black'
                      }`}
                    >
                      {value}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          {idx === 0 && <hr className='my-4 border-gray-300' />}
        </div>
      ))}
    </div>
  );
};

export default PlaceKeywordsInput;
