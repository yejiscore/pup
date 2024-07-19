import { atom } from 'recoil';
import { v1 } from 'uuid';

const uploadDataState = atom({
  key: 'uploadDataState',
  default: {
    walkingTrailId: '',
    walkingTime: '',
    walkingDistance: '',
    walkingPhotos: [] as any,
    walkingCoordinates: [] as { lat: number; lng: number }[], // 좌표 배열
  },
});

export default uploadDataState;

// const file = event.target.files?.[0];
// console.log('File:', file);
// if (file) {
//   const reader = new FileReader();
//   reader.onloadend = () => {
//     if (reader.result) {
//       setPhotos((prevPhotos) => [...prevPhotos, reader.result as string]);
//       // MinIO에 업로드
//       const s3 = new AWS.S3({
//         accessKeyId: process.env.REACT_APP_MINIO_ACCESS_KEY,
//         secretAccessKey: process.env.REACT_APP_MINIO_SECRET_KEY,
//         endpoint: process.env.REACT_APP_MINIO_ENDPOINT,
//         s3ForcePathStyle: true,
//         signatureVersion: 'v4',
//       });
//       const params = {
//         Bucket: process.env.REACT_APP_MINIO_BUCKET_NAME || '',
//         Key: `photos/${Date.now()}.jpg`,
//         Body: file,
//         ContentType: file.type,
//       };
//       s3.upload(params, (err: any, data: any) => {
//         if (err) {
//           console.error(err);
//           return;
//         }
//         console.log('Photo uploaded:', data);

//         // 상태 업데이트
//         setRecoilData((prevData) => ({
//           ...prevData,
//           walkingPhotos: [...prevData.walkingPhotos, data.Location], // 업로드된 이미지의 URL 저장
//         }));
//       });
//     }
//   };
//   reader.readAsDataURL(file);
// }
