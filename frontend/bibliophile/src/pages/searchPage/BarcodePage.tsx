import React, { useState } from "react";
// @ts-ignore
import { BarcodeScanner } from "@thewirv/react-barcode-scanner";
import { useNavigate } from "react-router-dom";

const BarcodePage: React.FC = () => {
  // @ts-ignore
  const [isbn, setIsbn] = useState<string>("");

  const navigate = useNavigate();

  // @ts-ignore
  const handleSuccessReadBarcode = () => {
    // TODO: ISBN 기반 검색 API 연동
  };

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative w-screen -left-[5.5%] max-w-[600px] min-h-[720px] overflow-hidden -mb-[100px] flex flex-col justify-space items-center">
      <i
        onClick={handleClickBack}
        className="fi fi-rr-angle-left text-white z-10 w-full flex items-start p-4"
      ></i>
      <p className="text-white text-base z-10 mt-[140px] mb-5">
        바코드를 아래 네모 칸에 맞춰서 넣어주세요
      </p>
      <div className="absolute tablet: max-w-[600px] inset-0 bg-black"></div>
      <div>
        <BarcodeScanner
          onSuccess={(detectedIsbn: React.SetStateAction<string>) => setIsbn(detectedIsbn)}
          onError={(error: { message: any }) => {
            if (error) {
              console.error(error.message);
            }
          }}
          containerStyle={{
            width: "280px",
            height: "280px",
          }}
        />
      </div>
    </div>
  );
};

export default BarcodePage;
