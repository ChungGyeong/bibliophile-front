import React, { useCallback, useEffect, useState } from "react";
import TagItemList from "@/components/tagItem/tagItemList.tsx";
import BookCardGrid from "@/components/bookCard/BookCardGrid.tsx";
import BookCardItem from "@/components/bookCard/BookCardItem.tsx";
import SelectBox from "@/components/common/SelectBox.tsx";
import { POPULAR_BOOKS_BY_AGE_AND_GENDER } from "@/constants/constants.ts";
import { getAgeAndGender, getAgeRange, getDefaultBook } from "@/utils/getTextFromUserInfo.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { loadPopularBookList, loadRecommendedBookList } from "@/redux/bookSlice.ts";
import { BookResponseType, PopularBookRequestType } from "@/types/books.ts";
import { ClassificationType } from "@/types/user.ts";
import { translateTagToEnglish } from "@/utils/translator.ts";
import { loadUser } from "@/redux/userSlice.ts";

const BookSuggestionPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const { recommendedBookList, popularBookList } = useSelector((state: RootState) => state.book);

  const [tags, setTags] = useState<ClassificationType[]>([]);
  const [filter, setFilter] = useState<PopularBookRequestType>({
    ageGroup: getAgeRange(user.birthday),
    gender: user.gender,
  });

  const handleChangeFilter = useCallback(
    (value: string) => {
      const [ageGroup, gender] = getAgeAndGender(value);
      setFilter({
        ageGroup: ageGroup,
        gender: gender,
      });
    },
    [setFilter]
  );

  useEffect(() => {
    dispatch(loadUser());
    dispatch(
      loadRecommendedBookList({
        tags: tags.map(translateTagToEnglish),
      })
    );

    dispatch(loadPopularBookList(filter));
  }, []);

  useEffect(() => {
    dispatch(
      loadRecommendedBookList({
        tags: tags.map(translateTagToEnglish),
      })
    );
  }, [tags]);

  useEffect(() => {
    dispatch(loadPopularBookList(filter));
  }, [filter]);

  return (
    <div>
      <div className="bg-white flex flex-col gap-5 min-h-[75vh]">
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

      <div className="bg-gray-green -mx-[5.5%] pb-[100px] -mb-[100px] mt-5 rounded-t-[10px] min-h-[75vh]">
        <div className="w-[90%] m-auto flex flex-col gap-5">
          <div className="mt-5">
            <p className="text-lg">성별과 연령대에 따른 책 추천</p>
            <p className="text-xs font-light">성별과 연령대 별 인기있는 메뉴</p>
          </div>
          <SelectBox
            options={POPULAR_BOOKS_BY_AGE_AND_GENDER}
            onSelect={handleChangeFilter}
            defaultOption={getDefaultBook(user.gender, user.birthday)}
          />

          {popularBookList.length === 0 ? (
            <p className="text-sm font-light w-full">
              해당 연령과 성별을 가진 사용자의 데이터가 부족합니다.
            </p>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default BookSuggestionPage;
