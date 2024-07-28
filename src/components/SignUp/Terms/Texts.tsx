/* eslint-disable react/no-unescaped-entities */
// src/components/SignUp/Terms/TermsText.tsx
import React, { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 60px 20px 0 20px;
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: bold;
  margin-top: 20px;
  color: #283330;
  line-height: 23.63px;
`;

const Text = styled.div`
  font-size: 14px;
  line-height: 16.71px;
  color: #283330;
`;

const List1 = styled.ul`
  margin-bottom: 20px;
  margin-left: 7px;
`;

const ListItem1 = styled.li`
  font-size: 14px;
  line-height: 1.6;
  color: #283330;
  &::marker {
    color: #283330;
  }
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  text-indent: -20px;
  padding-left: 20px;
  text-indent: -1em;
  padding-left: 1em;
`;

const List2 = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 20px;
`;

const ListItem2 = styled.li`
  font-size: 14px;
  line-height: 1.6;
  color: #283330;
`;

export const ServiceTerms: FC = () => (
  <Container>
    <Title>제 1조 (목적)</Title>
    <Text>
      이 이용약관(이하 '약관')은 “PuP” 서비스(이하 '웹 서비스')의 가입조건 및
      이용에 관한 제반 사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
    </Text>
    <Title>이용 계약의 성립</Title>
    <List1>
      <ListItem1>
        1. 이용 계약은 서비스 이용 회원의 본 약관에 대한 동의와 이용 신청에
        대하여 서비스 제공자가 이용 승낙을 함으로써 성립합니다.
      </ListItem1>
      <ListItem1>
        2. 본 이용 약관에 대한 동의는 이용 신청 시 해당 PuP 웹 내 이용 약관
        '동의함' 버튼을 누름으로써 성립합니다.
      </ListItem1>
    </List1>
    <Title>서비스 이용 신청</Title>
    <List1>
      <ListItem1>
        1. 서비스를 이용하고자 가입하여 본 서비스를 이용하고자 하는 자는 서비스
        신청 시 제공되는 제반 정보를 정확하고, 취지에 맞게 작성하여야 합니다.
      </ListItem1>
      <ListItem1>
        2. 회사는 본 서비스를 이용하는 서비스 회원을 이용 시간, 이용 횟수 등으로
        세분하여 이용에 차등을 둘 수 있습니다.
      </ListItem1>
    </List1>
    <Title>서비스 제공 및 변경</Title>
    <Text>
      서비스 제공자는 서비스 회원에게 아래와 같은 서비스를 제공합니다.
    </Text>
    <List1>
      <ListItem1>1. 강아지 산책 일지</ListItem1>
      <ListItem1>2. GPS 산책 루트 트래킹</ListItem1>
      <ListItem1>3. 사용자 위치 공유</ListItem1>
      <ListItem1>
        4. 기타 업데이트를 통해 회원들에게 제공할 일체의 서비스
      </ListItem1>
    </List1>
    <Title>[부칙]</Title>
    <Text>(시행일) 본 약관은 2024년 07월 10일부터 적용됩니다.</Text>
  </Container>
);

export const PersonalInfoTerms: FC = () => (
  <Container>
    <Text>a. 서비스 제공자는 고객의 개인정보를 보호하고 존중합니다.</Text>
    <br />
    <Text>
      b. 서비스 제공자는 이용신청 시 고객이 제공하는 정보, 각종 이벤트 참가를
      위하여 서비스 회원이 제공하는 정보, 기타 서비스 이용 과정에서 수집되는
      정보 등을 통해 서비스 회원에 관한 정보를 수집하며, 수집된 서비스 회원의
      정보는 본 이용계약의 이행과 본 이용계약상의 서비스 제공을 위한 목적으로
      사용됩니다.
    </Text>
    <br />
    <Text>
      c. 서비스 제공자는 서비스 제공과 관련하여 취득한 서비스 회원의 신상정보를
      본인의 승낙 없이 제3자에게 누설할 수 없습니다. 다만, 다음의 경우에는
      그러하지 아니합니다.
    </Text>
    <List2>
      <ListItem2>
        통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로서 특정 개인을
        알아볼 수 없는 형태로 가공하여 제공하는 경우
      </ListItem2>
      <ListItem2>
        관계 법령에 의하여 수사상 목적으로 정해진 절차와 방법에 따라 관계기관의
        요구가 있는 경우
      </ListItem2>
      <ListItem2>다른 법률에 특별한 규정이 있는 경우</ListItem2>
      <ListItem2>방송통신심의위원회가 관계법령에 의하여 요청 경우</ListItem2>
      <ListItem2>
        서비스 회원에게 보다 전문적이고 다양한 서비스를 제공하기 위한 경우
      </ListItem2>
    </List2>
    <br />
    <Text>
      d. 서비스 회원은 언제든 원할 경우 회사에 제공한 개인정보의 수집과 이용에
      관한 동의를 철회할 수 있고, 위 동의의 철회는 해지 신청을 하는 것으로
      이루어 집니다.
    </Text>
    <br />
    <Text>
      e. 개인정보보호와 관련된 보다 자세한 사항은 개인정보취급방침을 참조하시기
      바랍니다.
    </Text>
    <br />
    <Text>[부칙]</Text>
    <Text>(시행일) 본 약관은 2024년 07월 10일부터 적용됩니다.</Text>
  </Container>
);

export const LocationInfoTerms: FC = () => (
  <Container>
    <List1>
      <ListItem1>
        1. 서비스 제공자가 개인 위치 정보를 이용하여 서비스를 제공하고자 하는
        경우에는 본 약관에 대한 개인 위치 정보 주체의 동의를 얻어야 합니다.
      </ListItem1>
      <ListItem1>
        2. 서비스 제공자는 서비스 회원이 제공한 개인 위치 정보를 해당 회원의
        동의 없이 서비스 제공 이외의 목적으로 이용하지 않습니다. 다만, 회원이
        미리 요청한 경우 해당 내용을 회원이 지정한 통신단말장치(휴대전화 등)나
        이메일 주소로 통보할 수 있습니다.
      </ListItem1>
      <ListItem1>
        3. 서비스 제공자는 타사업자 또는 이용 고객과의 요금 정산 및 민원 처리
        등을 위해 서비스 회원의 위치정보 이용, 제공 사실 확인 자료를 자동 기록
        및 보존하며, 해당 자료는 3년간 보관합니다.
      </ListItem1>
      <ListItem1>
        4. 서비스 회원은 서비스 제공자에 대하여 언제든지 개인 위치 정보를 이용한
        위치 기반 서비스 제공 및 개인 위치 정보의 제3자 제공에 대한동의의 전부
        또는 일부를 철회할 수 있습니다. 이 경우 서비스 제공자는 수집한 개인 위치
        정보 및 위치 정보 이용, 제공 사실 확인 자료를 파기합니다.
      </ListItem1>
      <br />
      <Text>[부칙]</Text>
      <Text>(시행일) 본 약관은 2024년 07월 10일부터 적용됩니다.</Text>
    </List1>
  </Container>
);
