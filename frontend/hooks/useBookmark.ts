import { useCallback, useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';

import { deleteBookmarkApi, postBookmarkApi } from '@apis/bookmarkApi';
import curBookmarkedBookListState from '@atoms/curBookmarkedBookList';
import curKnottedBookListState from '@atoms/curKnottedBookList';
import { IBookScraps } from '@interfaces';
import { toastError } from '@utils/toast';

import useFetch from './useFetch';
import useUser from './useUser';

const useBookmark = (book: IBookScraps) => {
  const { signInUser, isSignInUser } = useUser();
  const [curKnottedBookList, setCurKnottedBookList] = useRecoilState(curKnottedBookListState);
  const [curBookmarkedBookList, setCurBookmarkedBookList] = useRecoilState(
    curBookmarkedBookListState
  );

  const { _count, bookmarks } = book;
  const [curBookmarkId, setCurBookmarkId] = useState<number | null>(
    bookmarks.length ? bookmarks[0].id : null
  );
  const [curBookmarkCnt, setCurBookmarkCnt] = useState(_count.bookmarks);

  const { data: postedBookmark, execute: postBookmark } = useFetch(postBookmarkApi);
  const { data: deletedBookmark, execute: deleteBookmark } = useFetch(deleteBookmarkApi);

  const handleBookmarkClick = useCallback(async () => {
    if (!isSignInUser) {
      toastError('로그인이 필요합니다.');
      return;
    }

    if (curBookmarkId) {
      deleteBookmark({ bookmarkId: curBookmarkId });
    } else {
      postBookmark({ book_id: book.id });
    }
  }, [curBookmarkId]);

  // 북마크 등록 시
  useEffect(() => {
    if (!postedBookmark) return;
    setCurBookmarkId(postedBookmark.bookmarkId);
    setCurBookmarkCnt(curBookmarkCnt + 1);

    const newBookmarkedBook = {
      ...book,
      bookmarks: [
        {
          id: postedBookmark.bookmarkId,
          user_id: signInUser.id,
          book_id: book.id,
        },
      ],
      _count: {
        bookmarks: curBookmarkCnt + 1,
      },
    };

    setCurKnottedBookList(
      curKnottedBookList.map((tempbook) => {
        if (tempbook.id === book.id) {
          return newBookmarkedBook;
        }
        return tempbook;
      })
    );
    setCurBookmarkedBookList([...curBookmarkedBookList, newBookmarkedBook]);
  }, [postedBookmark]);

  // 북마크 해제 시
  useEffect(() => {
    if (!deletedBookmark) return;
    setCurBookmarkId(null);
    setCurBookmarkCnt(curBookmarkCnt - 1);

    const newUnBookmarkedBook = {
      ...book,
      bookmarks: [],
      _count: {
        bookmarks: curBookmarkCnt - 1,
      },
    };

    setCurKnottedBookList(
      curKnottedBookList.map((tempbook) => {
        if (tempbook.id === book.id) {
          return newUnBookmarkedBook;
        }
        return tempbook;
      })
    );
    setCurBookmarkedBookList(curBookmarkedBookList.filter((tempbook) => tempbook.id !== book.id));
  }, [deletedBookmark]);

  return { handleBookmarkClick, curBookmarkCnt, curBookmarkId };
};

export default useBookmark;
