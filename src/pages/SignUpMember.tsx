// /* eslint-disable prefer-destructuring */
// /* eslint-disable jsx-a11y/label-has-associated-control */
// import React, { FC, useState, useRef, useEffect } from 'react';
// import styled from 'styled-components';
// import { v4 as uuidv4 } from 'uuid';
// import { useNavigate } from 'react-router-dom';
// import BaseBox from '../styles/common/BaseBox';
// import Header from '../components/SignUp/common/Header';
// import { Text1, Text2, Text3 } from '../components/SignUp/common/Text';
// import SignUpInfo from '../components/SignUp/SignUpInfo';
// import PlusButton from '../components/SignUp/button/PlusButton';
// import CompleteButton from '../components/SignUp/button/CompleteButton';
// import SignUpDetail from '../components/SignUp/common/SignUpDetail';
// import step1 from '../assets/login/step1.png';
// import step2 from '../assets/login/step3.png';

// const Container = styled.div`
//   width: 100%;
//   height: 100%;
//   overflow-y: auto; // Enable vertical scrolling

//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;

// const Step = styled.div`
//   width: 100%;
// `;

// const StepImages = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 20px;
//   margin-bottom: 20px;
// `;

// const StepImage = styled.img`
//   width: 35px;
//   height: 35px;
//   margin: 0 10px;
// `;

// const Spacer = styled.div`
//   height: 40px;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   width: 100%;
//   margin-top: 40px;
//   margin-bottom: 40px;
//   justify-content: center;
//   gap: 20px;
// `;

// const DeleteButton = styled.button`
//   width: 116px;
//   height: 34px;
//   border: 2px solid #00ae80;
//   border-radius: 100px;
//   background-color: white;
//   color: #00ae80;
//   font-size: 16px;
//   cursor: pointer;
// `;

// const UpdateButton = styled.button`
//   width: 116px;
//   height: 34px;
//   border: none;
//   border-radius: 100px;
//   background-color: #33be99;
//   color: #283330;
//   font-size: 16px;
//   cursor: pointer;
// `;

// const SignupMember: FC = () => {
//   const navigate = useNavigate();
//   const [petImage, setPetImage] = useState<string | null>(null);
//   const [neutered, setNeutered] = useState<string>('yes');
//   const [petDetails, setPetDetails] = useState<
//     {
//       id: string;
//       petImage: string | null;
//       petName: string;
//       petBirthday: string;
//       neutered: string;
//       editing: boolean;
//     }[]
//   >([]);
//   const [isEditing, setIsEditing] = useState<boolean>(false);

//   const petNameRef = useRef<HTMLInputElement>(null);
//   const petYearRef = useRef<HTMLSelectElement>(null);
//   const petMonthRef = useRef<HTMLSelectElement>(null);
//   const petDayRef = useRef<HTMLSelectElement>(null);

//   const handleAddPet = () => {
//     const petName = petNameRef.current?.value;
//     const petYear = petYearRef.current?.value;
//     const petMonth = petMonthRef.current?.value;
//     const petDay = petDayRef.current?.value;

//     if (petName && petYear && petMonth && petDay) {
//       const petBirthday =
//         petYear === 'unknown' || petMonth === 'unknown' || petDay === 'unknown'
//           ? 'unknown'
//           : `${petYear}-${petMonth}-${petDay}`;

//       setPetDetails([
//         ...petDetails,
//         {
//           id: uuidv4(),
//           petImage,
//           petName,
//           petBirthday,
//           neutered,
//           editing: false,
//         },
//       ]);
//       setPetImage(null);
//       if (petNameRef.current) petNameRef.current.value = '';
//       if (petYearRef.current) petYearRef.current.value = '';
//       if (petMonthRef.current) petMonthRef.current.value = '';
//       if (petDayRef.current) petDayRef.current.value = '';
//       setNeutered('yes');
//     }
//   };

//   const handleEditPet = (id: string) => {
//     const petToEdit = petDetails.find((pet) => pet.id === id);
//     if (petToEdit) {
//       setPetImage(petToEdit.petImage);
//       if (petNameRef.current) petNameRef.current.value = petToEdit.petName;
//       if (petYearRef.current) {
//         petYearRef.current.value = petToEdit.petBirthday.split('-')[0];
//       }
//       if (petMonthRef.current) {
//         petMonthRef.current.value = petToEdit.petBirthday.split('-')[1];
//       }
//       if (petDayRef.current) {
//         petDayRef.current.value = petToEdit.petBirthday.split('-')[2];
//       }
//       setNeutered(petToEdit.neutered);
//       setPetDetails((prevDetails) =>
//         prevDetails.map((pet) =>
//           pet.id === id ? { ...pet, editing: !pet.editing } : pet
//         )
//       );
//       setIsEditing(true);
//     }
//   };

//   const handleUpdatePet = (id: string) => {
//     const petName = petNameRef.current?.value;
//     const petYear = petYearRef.current?.value;
//     const petMonth = petMonthRef.current?.value;
//     const petDay = petDayRef.current?.value;

//     if (petName && petYear && petMonth && petDay) {
//       const petBirthday =
//         petYear === 'unknown' || petMonth === 'unknown' || petDay === 'unknown'
//           ? 'unknown'
//           : `${petYear}-${petMonth}-${petDay}`;

//       setPetDetails((prevDetails) =>
//         prevDetails.map((pet) =>
//           pet.id === id
//             ? {
//                 ...pet,
//                 petImage,
//                 petName,
//                 petBirthday,
//                 neutered,
//                 editing: false,
//               }
//             : pet
//         )
//       );
//       setPetImage(null);
//       if (petNameRef.current) petNameRef.current.value = '';
//       if (petYearRef.current) petYearRef.current.value = '';
//       if (petMonthRef.current) petMonthRef.current.value = '';
//       if (petDayRef.current) petDayRef.current.value = '';
//       setNeutered('yes');
//       setIsEditing(false);
//     }
//   };

//   const handleDeletePet = (id: string) => {
//     setPetDetails((prevDetails) => prevDetails.filter((pet) => pet.id !== id));
//     setIsEditing(false);
//   };

//   const handleComplete = () => {
//     navigate('/signupfinal', { state: { petDetails } });
//   };

//   const handleStartWalking = () => {
//     navigate('/main', { state: { petDetails } });
//   };

//   useEffect(() => {
//     if (isEditing) {
//       const petToEdit = petDetails.find((pet) => pet.editing);
//       if (petToEdit) {
//         if (petNameRef.current) petNameRef.current.value = petToEdit.petName;
//         if (petYearRef.current) {
//           petYearRef.current.value = petToEdit.petBirthday.split('-')[0];
//         }
//         if (petMonthRef.current) {
//           petMonthRef.current.value = petToEdit.petBirthday.split('-')[1];
//         }
//         if (petDayRef.current) {
//           petDayRef.current.value = petToEdit.petBirthday.split('-')[2];
//         }
//         setPetImage(petToEdit.petImage);
//         setNeutered(petToEdit.neutered);
//       }
//     }
//   }, [isEditing, petDetails]);

//   return (
//     <BaseBox>
//       <Container>
//         <Step>
//           <Header />
//           <StepImages>
//             <StepImage src={step1} alt="Step 1" />
//             <StepImage src={step2} alt="Step 2" />
//           </StepImages>

//           <Text1>마지막 입니다!</Text1>
//           <Text2>반려견 정보를 입력해 주세요</Text2>
//           <Text3>(최대 4마리)</Text3>
//         </Step>

//         {petDetails.length > 0 && <Spacer />}

//         {petDetails.map((pet) => (
//           <div key={pet.id}>
//             <SignUpDetail
//               petImage={pet.petImage || undefined}
//               petName={pet.petName}
//               petBirthday={pet.petBirthday}
//               neutered={pet.neutered}
//               onEdit={() => handleEditPet(pet.id)}
//             />
//             {pet.editing && (
//               <>
//                 <SignUpInfo
//                   petImage={petImage}
//                   setPetImage={setPetImage}
//                   neutered={neutered}
//                   setNeutered={setNeutered}
//                   petNameRef={petNameRef}
//                   petYearRef={petYearRef}
//                   petMonthRef={petMonthRef}
//                   petDayRef={petDayRef}
//                 />
//                 <ButtonContainer>
//                   <DeleteButton onClick={() => handleDeletePet(pet.id)}>
//                     삭제
//                   </DeleteButton>
//                   <UpdateButton onClick={() => handleUpdatePet(pet.id)}>
//                     수정 완료
//                   </UpdateButton>
//                 </ButtonContainer>
//               </>
//             )}
//           </div>
//         ))}

//         {!isEditing && petDetails.length < 4 && (
//           <div>
//             <SignUpInfo
//               petImage={petImage}
//               setPetImage={setPetImage}
//               neutered={neutered}
//               setNeutered={setNeutered}
//               petNameRef={petNameRef}
//               petYearRef={petYearRef}
//               petMonthRef={petMonthRef}
//               petDayRef={petDayRef}
//             />
//             <PlusButton onClick={handleAddPet} />
//           </div>
//         )}
//         <CompleteButton onClick={handleComplete} />
//       </Container>
//     </BaseBox>
//   );
// };

// export default SignupMember;

// /* eslint-disable prefer-destructuring */
// /* eslint-disable jsx-a11y/label-has-associated-control */
// import React, { FC, useState, useRef, useEffect } from 'react';
// import styled from 'styled-components';
// import { v4 as uuidv4 } from 'uuid';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useSetRecoilState } from 'recoil';
// import BaseBox from '../styles/common/BaseBox';
// import Header from '../components/SignUp/common/Header';
// import { Text1, Text2, Text3 } from '../components/SignUp/common/Text';
// import SignUpInfo from '../components/SignUp/SignUpInfo';
// import PlusButton from '../components/SignUp/button/PlusButton';
// import CompleteButton from '../components/SignUp/button/CompleteButton';
// import SignUpDetail from '../components/SignUp/common/SignUpDetail';
// import step1 from '../assets/login/step1.png';
// import step2 from '../assets/login/step3.png';
// import { authState } from '../stores/auth/authState';
// import { setCookie } from '../utils/cookiesUtils';

// const Container = styled.div`
//   width: 100%;
//   height: 100%;
//   overflow-y: auto;

//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;

// const Step = styled.div`
//   width: 100%;
// `;

// const StepImages = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 20px;
//   margin-bottom: 20px;
// `;

// const StepImage = styled.img`
//   width: 35px;
//   height: 35px;
//   margin: 0 10px;
// `;

// const Spacer = styled.div`
//   height: 40px;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   width: 100%;
//   margin-top: 40px;
//   margin-bottom: 40px;
//   justify-content: center;
//   gap: 20px;
// `;

// const DeleteButton = styled.button`
//   width: 116px;
//   height: 34px;
//   border: 2px solid #00ae80;
//   border-radius: 100px;
//   background-color: white;
//   color: #00ae80;
//   font-size: 16px;
//   cursor: pointer;
// `;

// const UpdateButton = styled.button`
//   width: 116px;
//   height: 34px;
//   border: none;
//   border-radius: 100px;
//   background-color: #33be99;
//   color: #283330;
//   font-size: 16px;
//   cursor: pointer;
// `;

// const SignupMember: FC = () => {
//   const navigate = useNavigate();
//   const setAuthState = useSetRecoilState(authState);
//   const [petImage, setPetImage] = useState<string | null>(null);
//   const [neutered, setNeutered] = useState<string>('yes');
//   const [petDetails, setPetDetails] = useState<
//     {
//       id: string;
//       petImage: string | null;
//       petName: string;
//       petBirthday: string;
//       neutered: string;
//       editing: boolean;
//     }[]
//   >([]);
//   const [isEditing, setIsEditing] = useState<boolean>(false);

//   const petNameRef = useRef<HTMLInputElement>(null);
//   const petYearRef = useRef<HTMLSelectElement>(null);
//   const petMonthRef = useRef<HTMLSelectElement>(null);
//   const petDayRef = useRef<HTMLSelectElement>(null);

//   const handleAddPet = () => {
//     const petName = petNameRef.current?.value;
//     const petYear = petYearRef.current?.value;
//     const petMonth = petMonthRef.current?.value;
//     const petDay = petDayRef.current?.value;

//     if (petName && petYear && petMonth && petDay) {
//       const petBirthday =
//         petYear === 'unknown' || petMonth === 'unknown' || petDay === 'unknown'
//           ? 'unknown'
//           : `${petYear}-${petMonth}-${petDay}`;

//       setPetDetails([
//         ...petDetails,
//         {
//           id: uuidv4(),
//           petImage,
//           petName,
//           petBirthday,
//           neutered,
//           editing: false,
//         },
//       ]);
//       setPetImage(null);
//       if (petNameRef.current) petNameRef.current.value = '';
//       if (petYearRef.current) petYearRef.current.value = '';
//       if (petMonthRef.current) petMonthRef.current.value = '';
//       if (petDayRef.current) petDayRef.current.value = '';
//       setNeutered('yes');
//     }
//   };

//   const handleEditPet = (id: string) => {
//     const petToEdit = petDetails.find((pet) => pet.id === id);
//     if (petToEdit) {
//       setPetImage(petToEdit.petImage);
//       if (petNameRef.current) petNameRef.current.value = petToEdit.petName;
//       if (petYearRef.current) {
//         petYearRef.current.value = petToEdit.petBirthday.split('-')[0];
//       }
//       if (petMonthRef.current) {
//         petMonthRef.current.value = petToEdit.petBirthday.split('-')[1];
//       }
//       if (petDayRef.current) {
//         petDayRef.current.value = petToEdit.petBirthday.split('-')[2];
//       }
//       setNeutered(petToEdit.neutered);
//       setPetDetails((prevDetails) =>
//         prevDetails.map((pet) =>
//           pet.id === id ? { ...pet, editing: !pet.editing } : pet
//         )
//       );
//       setIsEditing(true);
//     }
//   };

//   const handleUpdatePet = (id: string) => {
//     const petName = petNameRef.current?.value;
//     const petYear = petYearRef.current?.value;
//     const petMonth = petMonthRef.current?.value;
//     const petDay = petDayRef.current?.value;

//     if (petName && petYear && petMonth && petDay) {
//       const petBirthday =
//         petYear === 'unknown' || petMonth === 'unknown' || petDay === 'unknown'
//           ? 'unknown'
//           : `${petYear}-${petMonth}-${petDay}`;

//       setPetDetails((prevDetails) =>
//         prevDetails.map((pet) =>
//           pet.id === id
//             ? {
//                 ...pet,
//                 petImage,
//                 petName,
//                 petBirthday,
//                 neutered,
//                 editing: false,
//               }
//             : pet
//         )
//       );
//       setPetImage(null);
//       if (petNameRef.current) petNameRef.current.value = '';
//       if (petYearRef.current) petYearRef.current.value = '';
//       if (petMonthRef.current) petMonthRef.current.value = '';
//       if (petDayRef.current) petDayRef.current.value = '';
//       setNeutered('yes');
//       setIsEditing(false);
//     }
//   };

//   const handleDeletePet = (id: string) => {
//     setPetDetails((prevDetails) => prevDetails.filter((pet) => pet.id !== id));
//     setIsEditing(false);
//   };

//   const handleComplete = async () => {
//     try {
//       const response = await axios.post('/api/v1/auth/signup', {
//         petDetails,
//       });

//       const { data } = response;

//       // 로그인 처리
//       const loginResponse = await axios.post('/api/v1/auth/login', {
//         email: data.email, // 회원가입 시 사용한 이메일
//         password: data.password, // 회원가입 시 사용한 비밀번호
//       });

//       const loginData = loginResponse.data;

//       setAuthState({
//         userId: loginData.userId,
//         email: loginData.email,
//         nickname: loginData.nickname,
//         userUid: loginData.userUid,
//         token: {
//           accessToken: loginData.token.accessToken,
//           refreshToken: loginData.token.refreshToken,
//         },
//       });

//       setCookie('pup_access', loginData.token.accessToken, {
//         path: '/',
//         expires: new Date(new Date().getTime() + 30 * 60 * 1000), // 30분
//       });
//       setCookie('pup_refresh', loginData.token.refreshToken, {
//         path: '/',
//         expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7일
//       });

//       navigate('/walking_main', { state: { petDetails } });
//     } catch (error) {
//       console.error('회원가입 또는 로그인 실패:', error);
//     }
//   };

//   useEffect(() => {
//     if (isEditing) {
//       const petToEdit = petDetails.find((pet) => pet.editing);
//       if (petToEdit) {
//         if (petNameRef.current) petNameRef.current.value = petToEdit.petName;
//         if (petYearRef.current) {
//           petYearRef.current.value = petToEdit.petBirthday.split('-')[0];
//         }
//         if (petMonthRef.current) {
//           petMonthRef.current.value = petToEdit.petBirthday.split('-')[1];
//         }
//         if (petDayRef.current) {
//           petDayRef.current.value = petToEdit.petBirthday.split('-')[2];
//         }
//         setPetImage(petToEdit.petImage);
//         setNeutered(petToEdit.neutered);
//       }
//     }
//   }, [isEditing, petDetails]);

//   return (
//     <BaseBox>
//       <Container>
//         <Step>
//           <Header />
//           <StepImages>
//             <StepImage src={step1} alt="Step 1" />
//             <StepImage src={step2} alt="Step 2" />
//           </StepImages>

//           <Text1>마지막 입니다!</Text1>
//           <Text2>반려견 정보를 입력해 주세요</Text2>
//           <Text3>(최대 4마리)</Text3>
//         </Step>

//         {petDetails.length > 0 && <Spacer />}

//         {petDetails.map((pet) => (
//           <div key={pet.id}>
//             <SignUpDetail
//               petImage={pet.petImage || undefined}
//               petName={pet.petName}
//               petBirthday={pet.petBirthday}
//               neutered={pet.neutered}
//               onEdit={() => handleEditPet(pet.id)}
//             />
//             {pet.editing && (
//               <>
//                 <SignUpInfo
//                   petImage={petImage}
//                   setPetImage={setPetImage}
//                   neutered={neutered}
//                   setNeutered={setNeutered}
//                   petNameRef={petNameRef}
//                   petYearRef={petYearRef}
//                   petMonthRef={petMonthRef}
//                   petDayRef={petDayRef}
//                 />
//                 <ButtonContainer>
//                   <DeleteButton onClick={() => handleDeletePet(pet.id)}>
//                     삭제
//                   </DeleteButton>
//                   <UpdateButton onClick={() => handleUpdatePet(pet.id)}>
//                     수정 완료
//                   </UpdateButton>
//                 </ButtonContainer>
//               </>
//             )}
//           </div>
//         ))}

//         {!isEditing && petDetails.length < 4 && (
//           <div>
//             <SignUpInfo
//               petImage={petImage}
//               setPetImage={setPetImage}
//               neutered={neutered}
//               setNeutered={setNeutered}
//               petNameRef={petNameRef}
//               petYearRef={petYearRef}
//               petMonthRef={petMonthRef}
//               petDayRef={petDayRef}
//             />
//             <PlusButton onClick={handleAddPet} />
//           </div>
//         )}
//         <CompleteButton onClick={handleComplete} />
//       </Container>
//     </BaseBox>
//   );
// };

// export default SignupMember;

/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import BaseBox from '../styles/common/BaseBox';
import Header from '../components/SignUp/common/Header';
import { Text1, Text2, Text3 } from '../components/SignUp/common/Text';
import SignUpInfo from '../components/SignUp/SignUpInfo';
import PlusButton from '../components/SignUp/button/PlusButton';
import CompleteButton from '../components/SignUp/button/CompleteButton';
import SignUpDetail from '../components/SignUp/common/SignUpDetail';
import step1 from '../assets/login/step1.png';
import step2 from '../assets/login/step3.png';
import { authState } from '../stores/auth/authState';
import { setCookie } from '../utils/cookiesUtils';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Step = styled.div`
  width: 100%;
`;

const StepImages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StepImage = styled.img`
  width: 35px;
  height: 35px;
  margin: 0 10px;
`;

const Spacer = styled.div`
  height: 40px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 40px;
  margin-bottom: 40px;
  justify-content: center;
  gap: 20px;
`;

const DeleteButton = styled.button`
  width: 116px;
  height: 34px;
  border: 2px solid #00ae80;
  border-radius: 100px;
  background-color: white;
  color: #00ae80;
  font-size: 16px;
  cursor: pointer;
`;

const UpdateButton = styled.button`
  width: 116px;
  height: 34px;
  border: none;
  border-radius: 100px;
  background-color: #33be99;
  color: #283330;
  font-size: 16px;
  cursor: pointer;
`;

const SignupMember: FC = () => {
  const navigate = useNavigate();
  const [petImage, setPetImage] = useState<string | null>(null);
  const [neutered, setNeutered] = useState<string>('yes');
  const [petDetails, setPetDetails] = useState<
    {
      id: string;
      petImage: string | null;
      petName: string;
      petBirthday: string;
      neutered: string;
      editing: boolean;
    }[]
  >([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const petNameRef = useRef<HTMLInputElement>(null);
  const petYearRef = useRef<HTMLSelectElement>(null);
  const petMonthRef = useRef<HTMLSelectElement>(null);
  const petDayRef = useRef<HTMLSelectElement>(null);

  const handleAddPet = () => {
    const petName = petNameRef.current?.value;
    const petYear = petYearRef.current?.value;
    const petMonth = petMonthRef.current?.value;
    const petDay = petDayRef.current?.value;

    if (petName && petYear && petMonth && petDay) {
      const petBirthday =
        petYear === 'unknown' || petMonth === 'unknown' || petDay === 'unknown'
          ? 'unknown'
          : `${petYear}-${petMonth}-${petDay}`;

      setPetDetails([
        ...petDetails,
        {
          id: uuidv4(),
          petImage,
          petName,
          petBirthday,
          neutered,
          editing: false,
        },
      ]);
      setPetImage(null);
      if (petNameRef.current) petNameRef.current.value = '';
      if (petYearRef.current) petYearRef.current.value = '';
      if (petMonthRef.current) petMonthRef.current.value = '';
      if (petDayRef.current) petDayRef.current.value = '';
      setNeutered('yes');
    }
  };

  const handleEditPet = (id: string) => {
    const petToEdit = petDetails.find((pet) => pet.id === id);
    if (petToEdit) {
      setPetImage(petToEdit.petImage);
      if (petNameRef.current) petNameRef.current.value = petToEdit.petName;
      if (petYearRef.current) {
        petYearRef.current.value = petToEdit.petBirthday.split('-')[0];
      }
      if (petMonthRef.current) {
        petMonthRef.current.value = petToEdit.petBirthday.split('-')[1];
      }
      if (petDayRef.current) {
        petDayRef.current.value = petToEdit.petBirthday.split('-')[2];
      }
      setNeutered(petToEdit.neutered);
      setPetDetails((prevDetails) =>
        prevDetails.map((pet) =>
          pet.id === id ? { ...pet, editing: !pet.editing } : pet
        )
      );
      setIsEditing(true);
    }
  };

  const handleUpdatePet = (id: string) => {
    const petName = petNameRef.current?.value;
    const petYear = petYearRef.current?.value;
    const petMonth = petMonthRef.current?.value;
    const petDay = petDayRef.current?.value;

    if (petName && petYear && petMonth && petDay) {
      const petBirthday =
        petYear === 'unknown' || petMonth === 'unknown' || petDay === 'unknown'
          ? 'unknown'
          : `${petYear}-${petMonth}-${petDay}`;

      setPetDetails((prevDetails) =>
        prevDetails.map((pet) =>
          pet.id === id
            ? {
                ...pet,
                petImage,
                petName,
                petBirthday,
                neutered,
                editing: false,
              }
            : pet
        )
      );
      setPetImage(null);
      if (petNameRef.current) petNameRef.current.value = '';
      if (petYearRef.current) petYearRef.current.value = '';
      if (petMonthRef.current) petMonthRef.current.value = '';
      if (petDayRef.current) petDayRef.current.value = '';
      setNeutered('yes');
      setIsEditing(false);
    }
  };

  const handleDeletePet = (id: string) => {
    setPetDetails((prevDetails) => prevDetails.filter((pet) => pet.id !== id));
    setIsEditing(false);
  };

  const handleComplete = async () => {
    try {
      // 반려견 정보 저장 처리
      console.log('Starting pet details save process...');
      await Promise.all(
        petDetails.map(async (pet) => {
          const petResponse = await axios.post(
            'https://pup.pinomaker.com/api/v1/dog',
            {
              petName: pet.petName,
              petBirthday: pet.petBirthday,
              neutered: pet.neutered,
              petImage: pet.petImage,
            }
          );
          console.log('Pet saved successfully:', petResponse.data);
        })
      );

      navigate('/signupfinal', { state: { petDetails } });
    } catch (error) {
      console.error('반려견 정보 저장 실패:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
        console.error('Response headers:', error.response?.headers);
      }
    }
  };

  useEffect(() => {
    if (isEditing) {
      const petToEdit = petDetails.find((pet) => pet.editing);
      if (petToEdit) {
        if (petNameRef.current) petNameRef.current.value = petToEdit.petName;
        if (petYearRef.current) {
          petYearRef.current.value = petToEdit.petBirthday.split('-')[0];
        }
        if (petMonthRef.current) {
          petMonthRef.current.value = petToEdit.petBirthday.split('-')[1];
        }
        if (petDayRef.current) {
          petDayRef.current.value = petToEdit.petBirthday.split('-')[2];
        }
        setPetImage(petToEdit.petImage);
        setNeutered(petToEdit.neutered);
      }
    }
  }, [isEditing, petDetails]);

  return (
    <BaseBox>
      <Container>
        <Step>
          <Header />
          <StepImages>
            <StepImage src={step1} alt="Step 1" />
            <StepImage src={step2} alt="Step 2" />
          </StepImages>

          <Text1>마지막 입니다!</Text1>
          <Text2>반려견 정보를 입력해 주세요</Text2>
          <Text3>(최대 4마리)</Text3>
        </Step>

        {petDetails.length > 0 && <Spacer />}

        {petDetails.map((pet) => (
          <div key={pet.id}>
            <SignUpDetail
              petImage={pet.petImage || undefined}
              petName={pet.petName}
              petBirthday={pet.petBirthday}
              neutered={pet.neutered}
              onEdit={() => handleEditPet(pet.id)}
            />
            {pet.editing && (
              <>
                <SignUpInfo
                  petImage={petImage}
                  setPetImage={setPetImage}
                  neutered={neutered}
                  setNeutered={setNeutered}
                  petNameRef={petNameRef}
                  petYearRef={petYearRef}
                  petMonthRef={petMonthRef}
                  petDayRef={petDayRef}
                />
                <ButtonContainer>
                  <DeleteButton onClick={() => handleDeletePet(pet.id)}>
                    삭제
                  </DeleteButton>
                  <UpdateButton onClick={() => handleUpdatePet(pet.id)}>
                    수정 완료
                  </UpdateButton>
                </ButtonContainer>
              </>
            )}
          </div>
        ))}

        {!isEditing && petDetails.length < 4 && (
          <div>
            <SignUpInfo
              petImage={petImage}
              setPetImage={setPetImage}
              neutered={neutered}
              setNeutered={setNeutered}
              petNameRef={petNameRef}
              petYearRef={petYearRef}
              petMonthRef={petMonthRef}
              petDayRef={petDayRef}
            />
            <PlusButton onClick={handleAddPet} />
          </div>
        )}
        <CompleteButton onClick={handleComplete} />
      </Container>
    </BaseBox>
  );
};

export default SignupMember;
