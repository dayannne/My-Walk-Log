import { formatTimeAgo } from '@/app/shared/function/format';
import Image from 'next/image';
import { Fragment } from 'react';
import ConfirmModal from '../common/Modal/ConfirmModal';
import MenuModal from '../common/Modal/MenuModal';
import { useUserStore } from '@/app/store/client/user';
import { useDeleteComment } from '@/app/store/server/comment';
import { useModalStore } from '@/app/store/client/modal';

export interface CommentListProps {
  diaryId: number;
  comments: any;
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
  const { open, setOpen } = useModalStore();
  const { mutate: deleteComment } = useDeleteComment();

  const handleConfirm = (commentId: number) => {
    deleteComment({ diaryId, commentId });
  };

  return (
    <ul className='basis-full bg-white'>
      {comments.map((comment: any, idx: number) => (
        <li
          key={comment.id}
          className={`flex gap-3 border-solid border-gray-200 p-4 ${idx < comments.length - 1 && 'border-b'}`}
        >
          <Image
            className='mt-1 h-7 w-7 shrink-0 rounded-full object-cover'
            key={`user_${comment.authorId}_profile_image`}
            src={comment.author.profileImage}
            alt='프로필 이미지'
            width={50}
            height={50}
          />
          <div className='flex basis-full flex-col gap-1'>
            <div className='flex items-center justify-between gap-2'>
              <div className='flex basis-full flex-col'>
                <span className='text-sm font-semibold'>
                  {comment.author.username}
                </span>
                <span className='flex gap-1 text-xs text-gray-600'>
                  <span>
                    {JSON.parse(comment.author.address)
                      .areaName.split(' ')
                      .pop() || ''}
                  </span>
                  <span> {formatTimeAgo(comment.createdAt)}</span>
                </span>
              </div>
              {user?.id && user?.id === comment.authorId && (
                <MenuModal
                  firstMenu='댓글 수정하기'
                  firstMenuClose={() => {
                    setEditId(comment.id);
                    setContent(comment.content);
                  }}
                  secondMenu='댓글 삭제하기'
                  secondMenuClose={() => setOpen(true)}
                />
              )}
              <ConfirmModal
                description='정말로 삭제하시겠습니까?'
                onConfirm={() => handleConfirm(comment.id)}
                open={open}
                handleClose={() => setOpen(false)}
              />
            </div>
            <p className='text-sm'>
              {comment.content.split('\n').map((str: string, idx: number) => (
                <Fragment key={idx}>
                  {str}
                  <br />
                </Fragment>
              ))}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
