import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <i
        className="fi fi-rr-angle-left -ml-4"
        onClick={() => {
          navigate(-1);
        }}
      ></i>
      <br />
      <p className="text-lg font-bold my-2">개인정보 처리방침</p>
      <p className="text-base font-bold my-2">1. 서론</p>
      <p className="text-sm font-regular">
        "책 먹는 여우" (이하 "서비스")는 사용자님의 개인정보를 소중히 여기며, 이를 보호하기 위해
        최선을 다합니다. 본 개인정보 처리방침은 서비스 이용 시 수집되는 개인정보의 항목, 수집 및
        이용 목적, 보유 및 이용 기간, 제3자 제공, 권리와 의무에 대해 안내합니다.
      </p>
      <br />
      <p className="text-base font-bold my-2">2. 수집하는 개인정보의 항목</p>
      <p className="text-sm font-regular mb-1">서비스는 다음과 같은 개인정보를 수집합니다:</p>
      <span className="text-sm font-regular">- 필수 정보:</span>
      <ul>
        {[
          "비밀번호",
          "닉네임",
          "연결된 소셜 계정 정보 (카카오, 구글, 네이버)",
          "성별",
          "생년월일",
        ].map(label => (
          <li key={label} className="text-sm font-regular">
            {label}
          </li>
        ))}
      </ul>
      <br />
      <span className="text-sm font-regular">- 선택 정보:</span>
      <ul>
        {["이메일 주소", "프로필 이미지"].map(label => (
          <li key={label} className="text-sm font-regular">
            {label}
          </li>
        ))}
      </ul>
      <br />
      <p className="text-base font-bold my-2">3. 개인정보 수집 및 이용 목적</p>
      <p className="text-sm font-regular mb-1">
        서비스는 수집한 개인정보를 다음의 목적으로 이용합니다:
      </p>
      <p className="text-sm font-regular">- 회원가입 및 관리</p>
      <p className="text-sm font-regular">- 서비스 제공 및 운영</p>
      <p className="text-sm font-regular">- 사용자 맞춤형 서비스 제공</p>
      <p className="text-sm font-regular">- 고객 문의 및 불만 처리</p>
      <p className="text-sm font-regular">- 서비스 개선 및 연구</p>
      <p className="text-sm font-regular ">- 마케팅 및 광고 활용</p>
      <br />
      <p className="text-base font-bold my-2">4. 개인정보 보유 및 이용 기간</p>
      <p className="text-sm font-regular ">
        서비스는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 다만,
        관련 법령에 따라 보존할 필요가 있는 경우에는 법령에서 정한 기간 동안 보유합니다.
      </p>
      <br />
      <p className="text-base font-bold my-2">5. 개인정보 제3자 제공</p>
      <p className="text-sm font-regular mb-1">
        서비스는 사용자님의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우는
        예외로 합니다:
      </p>
      <p className="text-sm font-regular">- 법령에 의한 경우</p>
      <p className="text-sm font-regular">- 사용자님의 동의가 있는 경우</p>
      <p className="text-sm font-regular">- 서비스 제공을 위해 필요한 경우 (예: 결제 처리)</p>
      <br />
      <p className="text-base font-bold my-2">6. 개인정보 처리 위탁</p>
      <p className="text-sm font-regular">
        서비스는 원활한 서비스 제공을 위해 개인정보 처리 업무를 외부에 위탁할 수 있습니다. 이 경우
        위탁업체와의 계약을 통해 개인정보 보호를 위한 안전장치를 마련합니다.
      </p>
      <br />
      <p className="text-base font-bold my-2">7. 사용자 권리</p>
      <p className="text-sm font-regular mb-1">
        사용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다:
      </p>
      <p className="text-sm font-regular">- 개인정보 열람 요구</p>
      <p className="text-sm font-regular">- 개인정보 정정 요구</p>
      <p className="text-sm font-regular">- 개인정보 삭제 요구</p>
      <p className="text-sm font-regular">
        - 개인정보 처리 정지 요구 이와 같은 권리를 행사하고자 할 경우, 고객센터를 통해 요청하실 수
        있습니다.
      </p>
      <br />
      <p className="text-base font-bold my-2">8. 개인정보 안전성 확보 조치</p>
      <p className="text-sm font-regular mb-1">
        서비스는 개인정보의 안전성을 확보하기 위해 다음과 같은 조치를 취합니다:
      </p>
      <p className="text-sm font-regular">- 개인정보 접근 제한</p>
      <p className="text-sm font-regular">- 암호화 기술 적용</p>
      <p className="text-sm font-regular">- 정기적인 보안 점검</p>
      <br />
      <p className="text-base font-bold my-2">9. 개인정보 처리방침 변경</p>
      <p className="text-sm font-regular">
        본 개인정보 처리방침은 법령 및 서비스 정책에 따라 변경될 수 있으며, 변경 시에는 사전에
        공지합니다.
      </p>
      <br />
      <p className="text-base font-bold my-2">10. 연락처</p>
      <p className="text-sm font-regular mb-1">
        개인정보 처리와 관련하여 궁금한 점이 있으신 경우, 아래의 연락처로 문의하시기 바랍니다:
      </p>
      <p className="text-sm font-regular">이메일: chpark8938@gmail.com</p>
      <br />
      <hr />
      <br />
      <p className="text-sm font-medium">이 개인정보 처리방침은 2024년 9월 2일부터 시행됩니다.</p>
    </div>
  );
};

export default PrivacyPolicyPage;
