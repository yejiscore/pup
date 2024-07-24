// /* eslint-disable react/no-array-index-key */
// // src/components/Detail/Photo.tsx
// import React from 'react';
// import styled from 'styled-components';
// import { useParams } from 'react-router-dom';
// import { useAppContext } from '../../context/AppContext';
// import DefaultPhoto from '../../assets/photo.png';

// const Container = styled.div`
//     width: 100%;
//     height: 150px;
//     display: flex;
//     flex-direction: column;
//     padding: 0 30px;
//     box-sizing: border-box;
//     gap: 10px;
// `;

// const Title = styled.div`
//     font-size: 22px;
//     color: #00ae80;
//     margin-top: 10px;
// `;

// const PhotoContainer = styled.div`
//     display: flex;
//     gap: 10px;
//     overflow-x: scroll;
//     -ms-overflow-style: none;
//     scrollbar-width: none;
//     &::-webkit-scrollbar {
//         display: none;
//     }
// `;

// const PhotoItem = styled.img`
//     width: 100px;
//     height: 100px;
// `;

// function Photo() {
//     const { id } = useParams<{ id: string }>();
//     const { myData, likeData } = useAppContext();

//     const item =
//         myData.find((data) => data.id === Number(id)) ||
//         likeData.find((data) => data.id === Number(id));

//     if (!item) {
//         return <div>Data not found</div>;
//     }

//     const photos =
//         item.photos && item.photos.length > 0
//             ? item.photos
//             : Array(5).fill(DefaultPhoto);

//     return (
//         <Container>
//             <Title>기록</Title>
//             <PhotoContainer>
//                 {photos.map((photo, index) => (
//                     <PhotoItem
//                         key={`${photo}-${index}`}
//                         src={photo}
//                         alt={`photo ${index + 1}`}
//                     />
//                 ))}
//             </PhotoContainer>
//         </Container>
//     );
// }

// export default Photo;

/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import DefaultPhoto from '../../assets/photo.png';

const Container = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    padding: 0 30px;
    box-sizing: border-box;
    gap: 10px;
`;

const Title = styled.div`
    font-size: 22px;
    color: #00ae80;
    margin-top: 10px;
`;

const PhotoContainer = styled.div`
    display: flex;
    gap: 10px;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const PhotoItem = styled.img`
    width: 100px;
    height: 100px;
`;

function Photo() {
    const { id } = useParams<{ id: string }>();
    const { myData, likeData } = useAppContext();

    const item =
        myData.find((data) => data.id === Number(id)) ||
        likeData.find((data) => data.id === Number(id));

    if (!item) {
        return <div>Data not found</div>;
    }

    const photos: string[] =
        Array.isArray(item.photos) && item.photos.length > 0
            ? item.photos
            : Array(5).fill(DefaultPhoto);

    return (
        <Container>
            <Title>기록</Title>
            <PhotoContainer>
                {photos.map((photo, index) => (
                    <PhotoItem
                        key={`${photo}-${index}`}
                        src={photo}
                        alt={`photo ${index + 1}`}
                    />
                ))}
            </PhotoContainer>
        </Container>
    );
}

export default Photo;
