import React, { useEffect } from "react";
import SearchBox from "@/components/common/SearchBox.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { initSearchBookList, loadBookListByTitle } from "@/redux/bookSlice.ts";
import InfinityBookCard from "@/components/bookCard/InfinityBookCard.tsx";

const SearchPage: React.FC = () => {
  const [searchString, setSearchString] = React.useState("");
  const [validationText, setValidationText] = React.useState("");
  const [page, setPage] = React.useState(0);

  const dispatch = useDispatch<AppDispatch>();
  const { searchedBookList } = useSelector((state: RootState) => state.book);

  const handleChangeSearchBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 1) setValidationText("두 글자 이상 입력해주세요.");
    else setValidationText("");

    setSearchString(e.target.value);
  };

  useEffect(() => {
    dispatch(loadBookListByTitle({ title: searchString, page: page }));
  }, [page]);

  useEffect(() => {
    if (searchString.length === 0) dispatch(initSearchBookList());
  }, []);

  return (
    <div className="flex flex-col w-full gap-8 overflow-y-auto mt-5">
      <SearchBox value={searchString} handleChangeSearchBox={handleChangeSearchBox} />
      {validationText && (
        <p className="text-orange text-sm font-light -mt-6 pl-2">{validationText}</p>
      )}
      {searchedBookList.length === 0 ? (
        <p className="mt-7 m-auto text-base font-light">검색 결과가 없습니다.</p>
      ) : (
        <InfinityBookCard setPage={setPage} />
      )}
    </div>
  );
};

export default SearchPage;
