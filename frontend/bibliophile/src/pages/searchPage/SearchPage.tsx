import React, { useEffect } from "react";
import SearchBox from "@/components/common/SearchBox.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { loadBookListByTitle } from "@/redux/bookSlice.ts";
import InfinityBookCard from "@/components/bookCard/InfinityBookCard.tsx";

const SearchPage: React.FC = () => {
  const [searchString, setSearchString] = React.useState("");
  const [page, setPage] = React.useState(0);

  const dispatch = useDispatch<AppDispatch>();
  const { searchedBookList } = useSelector((state: RootState) => state.book);

  const handleChangeSearchBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const handleClickSearchIcon = () => {
    if (searchString) {
      dispatch(loadBookListByTitle({ title: searchString, page: 0 }));
    }
  };

  useEffect(() => {
    if (searchedBookList.length === 0) {
    }
  }, [searchedBookList]);

  useEffect(() => {
    dispatch(loadBookListByTitle({ title: searchString, page: page }));
  }, [page]);

  return (
    <div className="flex flex-col w-full gap-8 overflow-y-auto mt-5">
      <SearchBox
        value={searchString}
        handleChangeSearchBox={handleChangeSearchBox}
        handleClickSearchIcon={handleClickSearchIcon}
      />
      {searchedBookList.length === 0 && page === 0 ? (
        <p className="mt-7 m-auto text-base font-light">검색 결과가 없습니다.</p>
      ) : searchedBookList.length === 0 && page > 0 ? (
        <p className="m-auto text-base font-light text-center">
          모든 검색 결과를 보여드렸어요! <br />
          다시 검색해주세요.
        </p>
      ) : (
        <InfinityBookCard page={page} setPage={setPage} searchString={searchString} />
      )}
    </div>
  );
};

export default SearchPage;
