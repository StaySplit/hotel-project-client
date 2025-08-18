import { useMemo, useRef, useState } from 'react';

import { CircleX, Upload } from 'lucide-react';

interface CommonImageInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  setFiles: (next: File[]) => void;
  files: File[];
  error?: boolean;
  className?: string;
  multiple?: boolean;
  label?: string;
}

type PendingAction = { type: 'append' } | { type: 'replace'; index: number } | null;

const CommonImageInput = ({
  setFiles,
  files,
  name,
  error = false,
  className,
  multiple = false,
  label,
  ...rest
}: CommonImageInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<PendingAction>(null);

  const urls = useMemo(() => {
    if (!files?.length) return [];
    return files.map((f) => URL.createObjectURL(f));
  }, [files]);

  const remaining = Math.max(0, 4 - files.length);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;

    if (!list || list.length === 0) {
      setPending(null);
      return;
    }

    if (!multiple) {
      // 단일 업로드
      setFiles([list[0]]);
      setPending(null);
      return;
    }

    const incoming = Array.from(list);

    if (pending?.type === 'replace') {
      const copy = files.slice();
      copy[pending.index] = incoming[0];
      setFiles(copy);
      setPending(null);
      return;
    }

    const room = Math.max(0, 4 - files.length);
    const toAppend = incoming.slice(0, room);
    setFiles([...files, ...toAppend]);
    setPending(null);
  };

  const onDeleteImage = (idx: number) => {
    const copy = files.slice();
    copy.splice(idx, 1);
    setFiles(copy);
    return;
  };

  const openPicker = (pending: PendingAction) => {
    setPending(pending);
    inputRef.current?.click();
  };

  return (
    <div>
      {label && <p className="mb-1">{label}</p>}
      <div
        className={`bg-gray-primary/30 ${error ? 'border-error/50' : 'border-gray-primary'} ${!multiple ? 'h-[250px]' : 'h-auto p-2'} w-full overflow-hidden rounded-lg border ${className}`}
      >
        <div
          className={`${multiple ? 'grid grid-cols-3 gap-2 md:grid-cols-4' : 'flex h-full w-full items-center justify-center overflow-hidden'}`}
        >
          {/* 업로드된 이미지들 */}
          {urls.map((url, i) => (
            <div
              key={`${files[i].name} ${i}`}
              className={`relative ${multiple ? 'aspect-square' : 'h-full w-full'} overflow-hidden rounded-lg`}
            >
              <img
                src={url}
                alt={`${i + 1}번째 이미지`}
                className="block h-full w-full cursor-pointer"
                onClick={() => openPicker({ type: 'replace', index: i })}
                title="클릭해서 교체"
              />
              {multiple && (
                <button
                  type="button"
                  onClick={() => onDeleteImage(i)}
                  className="absolute top-1 right-1 inline-flex cursor-pointer items-center gap-1 rounded-full bg-black/50 text-white"
                  aria-label={`${i + 1}번째 이미지 삭제`}
                >
                  <CircleX size={24} />
                </button>
              )}
            </div>
          ))}

          {Array.from({ length: multiple ? remaining : files[0] ? 0 : 1 }).map((_, idx) => (
            <button
              type="button"
              key={`empty-${idx}`}
              onClick={() => openPicker({ type: 'append' })}
              className={`flex ${multiple ? 'aspect-square' : 'h-full w-full'} cursor-pointer items-center justify-center rounded-xl bg-white transition-all hover:bg-gray-50`}
              aria-label="이미지 추가"
              title="이미지 추가"
            >
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <Upload size={28} />
                <span className="text-xs">추가</span>
              </div>
            </button>
          ))}
        </div>

        <input
          ref={inputRef}
          onChange={handleImageChange}
          name={name}
          type="file"
          accept="image/*"
          className="hidden"
          multiple={multiple}
          {...rest}
        />
      </div>
    </div>
  );
};

export default CommonImageInput;
