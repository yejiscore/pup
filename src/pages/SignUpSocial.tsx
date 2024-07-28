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

// const Container = styled.div`
//   width: 100%;
//   height: 100%;
//   overflow-y: auto;

//   &::-webkit-scrollbar {
//     display: none;
//   }
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

// const SignupSocial: FC = () => {
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
//       if (petYearRef.current)
//         petYearRef.current.value = petToEdit.petBirthday.split('-')[0];
//       if (petMonthRef.current)
//         petMonthRef.current.value = petToEdit.petBirthday.split('-')[1];
//       if (petDayRef.current)
//         petDayRef.current.value = petToEdit.petBirthday.split('-')[2];
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
//         if (petYearRef.current)
//           petYearRef.current.value = petToEdit.petBirthday.split('-')[0];
//         if (petMonthRef.current)
//           petMonthRef.current.value = petToEdit.petBirthday.split('-')[1];
//         if (petDayRef.current)
//           petDayRef.current.value = petToEdit.petBirthday.split('-')[2];
//         setPetImage(petToEdit.petImage);
//         setNeutered(petToEdit.neutered);
//       }
//     }
//   }, [isEditing, petDetails]);

//   return (
//     <BaseBox>
//       <Header />
//       <Container>
//         <Text1>반려견과 함께 산책을 시작해 볼까요?</Text1>
//         <Text2>반려견 정보를 입력해 주세요</Text2>
//         <Text3>(최대 4마리)</Text3>

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

// export default SignupSocial;

/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import BaseBox from '../styles/common/BaseBox';
import Header from '../components/SignUp/common/Header';
import { Text1, Text2, Text3 } from '../components/SignUp/common/Text';
import SignUpInfo from '../components/SignUp/SignUpInfo';
import PlusButton from '../components/SignUp/button/PlusButton';
import CompleteButton from '../components/SignUp/button/CompleteButton';
import SignUpDetail from '../components/SignUp/common/SignUpDetail';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
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

const SignupSocial: FC = () => {
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
      if (petNameRef.current) {
        petNameRef.current.value = petToEdit.petName;
      }
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

  const handleComplete = () => {
    navigate('/signupfinal', { state: { petDetails } });
  };

  const handleStartWalking = () => {
    navigate('/main', { state: { petDetails } });
  };

  useEffect(() => {
    if (isEditing) {
      const petToEdit = petDetails.find((pet) => pet.editing);
      if (petToEdit) {
        if (petNameRef.current) {
          petNameRef.current.value = petToEdit.petName;
        }
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
      <Header />
      <Container>
        <Text1>반려견과 함께 산책을 시작해 볼까요?</Text1>
        <Text2>반려견 정보를 입력해 주세요</Text2>
        <Text3>(최대 4마리)</Text3>

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

export default SignupSocial;
