import React, { useCallback, useEffect, useState } from "react";
import TagItemList from "@/components/tagItem/tagItemList.tsx";
import BookCardGrid from "@/components/bookCard/BookCardGrid.tsx";
import BookCardItem from "@/components/bookCard/BookCardItem.tsx";
import SelectBox from "@/components/common/SelectBox.tsx";
import { POPULAR_BOOKS_BY_AGE_AND_GENDER } from "@/constants/constants.ts";
import { getDefaultBook } from "@/utils/getTextFromUserInfo.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { loadPopularBookList, loadRecommendedBookList } from "@/redux/bookSlice.ts";
import { BookResponseType } from "@/types/books.ts";
import { ClassificationType } from "@/types/user.ts";
import { loadUser } from "@/redux/userSlice.ts";

const BookSuggestionPage: React.FC = () => {
  const [tags, setTags] = useState<ClassificationType[]>([]);
  const [filter, setFilter] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const { recommendedBookList, popularBookList } = useSelector((state: RootState) => state.book);

  const handleChangeFilter = useCallback(
    (value: string) => {
      setFilter(value);
    },
    [setFilter]
  );

  useEffect(() => {
    dispatch(loadUser()).then(response => {
      if (response.payload !== undefined) {
        dispatch(
          loadRecommendedBookList({
            id: user.userId,
            tags: tags,
          })
        );

        dispatch(
          loadPopularBookList({
            page: 0,
            size: 6,
            sort: [],
          })
        );
      }
    });
  }, []);

  useEffect(() => {
    dispatch(
      loadRecommendedBookList({
        id: user.userId,
        tags: tags,
      })
    );
  }, [tags]);

  useEffect(() => {
    dispatch(
      loadPopularBookList({
        page: 0,
        size: 6,
        sort: [],
      })
    );
  }, [filter]);

  return (
    <div>
      <div className="bg-white flex flex-col gap-5">
        <div className="mt-10">
          <p className="text-lg">나에게 딱! 맞는 맞춤 추천</p>
          <p className="text-xs font-light">여우의 입맛에 맞을 추천 메뉴</p>
        </div>

        <TagItemList
          layoutType="bookSelect"
          tags={tags}
          setTags={newTags => setTags([...newTags])}
        />

        <BookCardGrid>
          {recommendedBookList.map((book: BookResponseType) => (
            <BookCardItem
              key={book.bookId}
              bookId={book.bookId}
              title={book.title}
              thumbnail={book.thumbnail}
              authors={book.authors}
              isBookmarked={book.isBookmarked}
            />
          ))}
        </BookCardGrid>
      </div>

      <div className="bg-gray-green -mx-[5.5%] pb-[100px] -mb-[100px] mt-5 rounded-t-[10px]">
        <div className="w-[90%] m-auto flex flex-col gap-5">
          <div className="mt-5">
            <p className="text-lg">성별과 연령대에 따른 책 추천</p>
            <p className="text-xs font-light">성별과 연령대 별 인기있는 메뉴</p>
          </div>

          <SelectBox
            options={POPULAR_BOOKS_BY_AGE_AND_GENDER}
            onSelect={handleChangeFilter}
            defaultOption={filter ? filter : getDefaultBook(user.gender, user.birthday)}
          />

          <BookCardGrid>
            {popularBookList.map((book: BookResponseType) => (
              <BookCardItem
                key={book.bookId}
                bookId={book.bookId}
                title={book.title}
                thumbnail={book.thumbnail}
                authors={book.authors}
                isBookmarked={book.isBookmarked}
              />
            ))}
          </BookCardGrid>
        </div>
      </div>
    </div>
  );
};

export default BookSuggestionPage;
