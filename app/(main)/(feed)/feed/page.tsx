import Header from '@/app/_component/common/Header';
import FeedDiary from '@/app/_component/diary/FeedDiaryList';

const FeedPage = () => {
  return (
    <div className='flex h-full w-full basis-full flex-col'>
      <Header title='피드' />
      <div className='flex basis-full flex-col overflow-y-scroll'>
        <FeedDiary />
      </div>
    </div>
  );
};

export default FeedPage;
