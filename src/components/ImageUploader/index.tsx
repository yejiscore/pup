// ** React Imports
import { ChangeEvent, useEffect, useRef } from 'react';

// ** Aws Imports
import AWS from 'aws-sdk';

interface PropsType {
  image: string;
  setPath: (e: string) => void;
}
export const ImageUploader = ({ setPath, image }: PropsType) => {
  const inputRef = useRef<HTMLInputElement | any>(null);

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = null;
    }
  };

  const click = () => {
    if (inputRef) {
      inputRef.current.click();
    }
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const s3 = new AWS.S3({
        accessKeyId: process.env.MINIO_ACCESS_KEY,
        secretAccessKey: process.env.MINIO_SECRET_KEY,
        endpoint: process.env.MINIO_ENDPOINT,
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
      });
      const params = {
        Bucket: process.env.MINIO_BUCKET_NAME || '',
        Key: file.name,
        Body: file,
      };
      s3.upload(params, (err: any, data: any) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
        setPath(data.Location);
      });
    }
  };

  useEffect(() => {
    if (image === '') {
      clearInput();
    }
  }, [image]);

  return (
    <div onClick={click}>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};
