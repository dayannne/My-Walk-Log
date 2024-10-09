import { ICommentReq } from '@/app/shared/types/comment';
import { useUserStore } from '@/app/store/client/user';
import { useCreateComment, useEditComment } from '@/app/store/server/comment';
import Image from 'next/image';

export interface CommentformProps {
  diaryId: number;
  content: string;
  setContent: (content: string) => void;
  editId: number | null;
  setEditId: (editId: number | null) => void;
}

const Commentform = ({
  diaryId,
  content,
  setContent,
  editId,
  setEditId,
}: CommentformProps) => {
  const { user } = useUserStore();

  const { mutate: editComment } = useEditComment();
  const { mutate: createComment } = useCreateComment();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      return alert('로그인 후 이용가능합니다.');
    }

    if (editId) {
      const data: ICommentReq = {
        content,
      };
      editComment({ data, userId: user?.id, diaryId, commentId: editId });
    } else {
      const data: ICommentReq = {
        content,
      };
      createComment({ data, userId: user?.id, diaryId });
    }
    setContent('');
  };

  const handleCloseBtnClick = () => {
    setEditId(null);
    setContent('');
  };

  return (
    <form
      className='sticky bottom-0 left-0 right-0 flex w-full gap-2 border-t border-solid border-gray-200 bg-white px-4 py-2'
      onSubmit={onSubmit}
    >
      <label htmlFor='comment' className='sr-only'>
        댓글 입력하기
      </label>
      <textarea
        id='comment'
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}
        maxLength={300}
        rows={1}
        placeholder={'댓글을 입력해 주세요.'}
        className='w-full resize-none overflow-y-auto rounded-md bg-gray-100 px-4 py-3 text-sm outline-none'
      />
      {editId && (
        <button
          type='button'
          onClick={handleCloseBtnClick}
          className='flex shrink-0 items-center justify-center rounded-xl border border-solid bg-gray-200 p-2'
        >
          <Image
            src='/icons/icon-cancel.svg'
            alt='댓글 수정 취소'
            className='h-4 w-4'
            width={16}
            height={16}
          />
        </button>
      )}
      <button
        type='submit'
        className='text-main-color bg-hover border-olive-green text-olive-green shrink-0 rounded-lg border border-solid px-3 py-1 shadow-sm disabled:bg-gray-200 disabled:text-gray-500'
      >
        등록
      </button>
    </form>
  );
};

export default Commentform;
