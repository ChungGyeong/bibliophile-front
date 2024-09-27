import React from "react";
import TagItemList from "@/components/tagItem/tagItemList.tsx";
import BookCardGrid from "@/components/bookCard/BookCardGrid.tsx";
import BookCardItem from "@/components/bookCard/BookCardItem.tsx";
import SelectBox from "@/components/common/SelectBox.tsx";
import { POPULAR_BOOKS_BY_AGE_AND_GENDER } from "@/constants/constants.ts";
import { UsersResponse } from "@/types/user.ts";
import { getDefaultBook } from "@/utils/getTextFromUserInfo.ts";

const bookList = [
  {
    bookId: 1,
    title: "해리 포터와 마법사의 돌",
    thumbnail: "https://image.yes24.com/Goods/116422051/XL",
    authors: "J.K. 롤링",
    isBookmarked: true,
  },
  {
    bookId: 2,
    title: "자기계발서",
    thumbnail: "https://image.yes24.com/Goods/116422051/XL",
    authors: "트레버 모리슨",
    isBookmarked: false,
  },
  {
    bookId: 3,
    title: "프로그래밍의 정석",
    thumbnail: "https://image.yes24.com/Goods/116422051/XL",
    authors: "홍길동",
    isBookmarked: true,
  },
  {
    bookId: 4,
    title: "우리가 몰랐던 역사",
    thumbnail: "https://image.yes24.com/Goods/116422051/XL",
    authors: "김철수",
    isBookmarked: false,
  },
  {
    bookId: 5,
    title: "인공지능의 미래",
    thumbnail: "https://image.yes24.com/Goods/116422051/XL",
    authors: "이영희",
    isBookmarked: true,
  },
  {
    bookId: 6,
    title: "책 먹는 여우",
    thumbnail: "https://image.yes24.com/Goods/116422051/XL",
    authors: "프란치스카 비어만",
    isBookmarked: true,
  },
];

const user: UsersResponse = {
  userId: 12345,
  email: "example@example.com",
  nickname: "빌리",
  gender: "MAN",
  birthday: "1990-05-20",
  classification: ["LITERATURE", "PHILOSOPHY", "ARTS"],
  profileImage:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSjC7La64XiIZjifQW3gNvr6LwDE4vI_iCvQ&s",
  oauthServerType: "KAKAO",
};

const BookSuggestionPage: React.FC = () => {
  return (
    <div>
      <div className="bg-white flex flex-col gap-5">
        <div className="mt-10">
          <p className="text-lg">나에게 딱! 맞는 맞춤 추천</p>
          <p className="text-xs font-light">여우의 입맛에 맞을 추천 메뉴</p>
        </div>

        <TagItemList layoutType="bookSelect" tags={new Set()} setTags={() => {}} />

        <BookCardGrid>
          {bookList.map((book, idx) => (
            <BookCardItem
              key={idx}
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
            onSelect={() => {}}
            defaultOption={getDefaultBook(user.gender, user.birthday)}
          />

          <BookCardGrid>
            {bookList.map((book, idx) => (
              <BookCardItem
                key={idx}
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
