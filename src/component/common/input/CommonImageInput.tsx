import { useEffect, useState } from 'react';

import { Upload } from 'lucide-react';

interface CommonImageInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  className?: string;
  multiple?: false;
  imageFiles: File;
}

const CommonImageInput = ({
  onChange,
  name,
  error,
  className,
  multiple = false,
  imageFiles,
  ...rest
}: CommonImageInputProps) => {
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (imageFiles) {
      setImagePreview(URL.createObjectURL(imageFiles));
    }
  }, [imageFiles]);

  return (
    <div
      className={`bg-gray-primary/30 ${error ? 'border-error' : 'border-gray-primary/30'} h-[200px] w-full overflow-hidden rounded-lg border ${className}`}
    >
      <label className="flex h-full cursor-pointer items-center justify-center">
        {imagePreview && (
          <img src={imagePreview} className="h-full w-full" alt="호텔 메인 이미지" />
        )}

        {!imagePreview && (
          <div className="flex flex-col items-center gap-2" aria-label="이미지 업로드">
            <Upload size={32} />
            <span>이미지 등록하기</span>
          </div>
        )}
        <input
          onChange={onChange}
          name={name}
          type="file"
          accept="image/*"
          className="hidden"
          multiple={multiple}
          {...rest}
        />
      </label>
    </div>
  );
};

export default CommonImageInput;
