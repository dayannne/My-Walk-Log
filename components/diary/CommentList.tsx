import { formatTimeAgo } from '@/shared/function/format';
import Image from 'next/image';
import { Fragment } from 'react';
import ConfirmModal from '../common/Modal/ConfirmModal';
import MenuModal from '../common/Modal/MenuModal';
import { useUserStore } from '@/store/client/user';
import { useDeleteComment } from '@/store/server/comment';
import { useModalStore } from '@/store/client/modal';
import { IComment } from '@/shared/types/comment';

export interface CommentListProps {
  diaryId: number;
  comments: IComment[];
  setContent: (content: string) => void;
  setEditId: (editId: number | null) => void;
}

const CommentList = ({
  diaryId,
  comments,
  setContent,
  setEditId,
}: CommentListProps) => {
  const { user } = useUserStore();
  const { openId, setOpenId } = useModalStore();
  const { mutate: deleteComment } = useDeleteComment();

  const handleConfirm = (commentId: number) => {
    if (!user) {
      return alert('로그인 후 이용가능합니다.');
    }
    deleteComment({ userId: user.id, diaryId, commentId });
  };

  return (
    <ul className='basis-full bg-white'>
      {comments?.map((comment: IComment, idx: number) => (
        <li
          key={comment?.id}
          className={`flex gap-3 border-solid border-gray-200 p-4 ${idx < comments?.length - 1 && 'border-b'}`}
        >
          <Image
            className='mt-1 h-7 w-7 shrink-0 rounded-full object-cover'
            key={`user_${comment?.authorId}_profile_image`}
            src={comment?.author?.profileImage}
            alt='프로필 이미지'
            width={50}
            height={50}
          />
          <div className='flex basis-full flex-col gap-1'>
            <div className='flex items-center justify-between gap-2'>
              <div className='flex basis-full flex-col'>
                <span className='text-sm font-semibold'>
                  {comment?.author?.username}
                </span>
                <span className='flex gap-1 text-xs'>
                  {comment?.author?.address?.areaName && (
                    <span className='text-gray-600'>
                      {comment?.author?.address?.areaName?.split(' ').pop() ||
                        ''}
                    </span>
                  )}
                  <span className='text-gray-600'>
                    {formatTimeAgo(comment?.createdAt)}
                  </span>
                </span>
              </div>
              {user?.id && user?.id === comment?.authorId && (
                <MenuModal
                  firstMenu='댓글 수정하기'
                  firstMenuClose={() => {
                    setEditId(comment?.id);
                    setContent(comment?.content);
                  }}
                  secondMenu='댓글 삭제하기'
                  secondMenuClose={() => setOpenId(comment?.id)}
                />
              )}
            </div>
            <p className='text-sm'>
              {comment?.content?.split('\n').map((str: string, idx: number) => (
                <Fragment key={idx}>
                  {str}
                  <br />
                </Fragment>
              ))}
            </p>
          </div>
        </li>
      ))}
      <ConfirmModal
        description='정말로 삭제하시겠습니까?'
        onConfirm={() => handleConfirm(openId as number)}
        open={Boolean(openId)}
        handleClose={() => setOpenId(null)}
      />
    </ul>
  );
};

export default CommentList;
