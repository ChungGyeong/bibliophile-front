import React from "react";
// @ts-ignore
import { BarcodeScanner } from "@thewirv/react-barcode-scanner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.ts";
import { loadBookByIsbn } from "@/redux/bookSlice.ts";

const BarcodePage: React.FC = () => {
  const [errorMessage, setErrorMessage] = React.useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { searchedBookId, error } = useSelector((state: RootState) => state.book);

  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  const handleSuccessDetectedIsbn = (detectedIsbn: React.SetStateAction<string>) => {
    dispatch(loadBookByIsbn(detectedIsbn.toString())).then(response => {
      if (error !== undefined) {
        alert("등록되지 않은 책 입니다!");
        return;
      }

      if (response.payload !== undefined && searchedBookId !== undefined) {
        navigate("/books/" + searchedBookId);
      }
    });
  };

  return (
    <div className="relative w-screen -left-[5.5%] max-w-[600px] min-h-[720px] overflow-hidden -mb-[100px] flex flex-col justify-space items-center">
      <i
        onClick={handleClickBack}
        className="fi fi-rr-angle-left text-white z-10 w-full flex items-start p-4"
      ></i>

      <div className="absolute tablet: max-w-[600px] inset-0 bg-black"></div>

      <p className="text-white text-base z-10 mt-[140px] mb-5">
        바코드를 아래 네모 칸에 맞춰서 넣어주세요
      </p>

      {errorMessage !== "" ? (
        <p className="text-white text-base mt-[50%] z-10">{errorMessage}</p>
      ) : (
        <div>
          <BarcodeScanner
            onSuccess={(detectedIsbn: React.SetStateAction<string>) =>
              handleSuccessDetectedIsbn(detectedIsbn)
            }
            onError={(error: { message: any }) => {
              if (error) {
                setErrorMessage(error.message);
              }
            }}
            containerStyle={{
              width: "280px",
              height: "280px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BarcodePage;
