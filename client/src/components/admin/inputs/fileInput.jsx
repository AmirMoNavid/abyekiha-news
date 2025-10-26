import { useState } from 'react';
import Err from '../../err';
import { LuUpload } from 'react-icons/lu';

const FileInput = ({
  accept,
  id,
  name,
  className,
  maxSize,
  showFilePreview = false,
}) => {
  const [imgPreview, setImgPreview] = useState(null);
  const readURL = (input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImgPreview({
          name: input.files[0]?.name,
          base64: String(e.target.result),
        });
      };

      reader.readAsDataURL(input.files[0]);
    }
  };

  return (
    <div className="flex justify-start items-start w-full">
      <label
        htmlFor={id}
        className={`${className} p-3 f-center relative flex-col w-1/2 border-2 border-black-300 border-dashed rounded-md cursor-pointer bg-black-200 hoverOpacity`}
      >
        <div className="!ltr flex flex-col items-center justify-center pt-5 pb-6">
          <LuUpload />
          <p className="mt-2 text-sm text-center">
            <span className="font-semibold">Click to upload</span>
            or drag and drop
          </p>
          <p className="text-sm text-center">
            <strong>Accepted Formats:</strong>{' '}
            {accept.replace(/[,]/g, ' ').toUpperCase()}
            <br />
            <strong>Max Size:</strong>{' '}
            {`${maxSize.width}px x ${maxSize.height}px`}
          </p>
        </div>

        <input
          name={name}
          id={id}
          type="file"
          className="opacity-0 -z-10 absolute top-0 left-0"
          accept={accept}
          onChange={function (e) {
            if (showFilePreview) readURL(e.target);
          }}
        />
        <Err />
      </label>

      {showFilePreview && imgPreview && (
        <div
          className={`${className} w-full flex gap-x-4 items-center h-20 px-4 rounded-md`}
        >
          <img width={80} height={80} src={imgPreview.base64} />
          <p>{imgPreview.name}</p>
        </div>
      )}
    </div>
  );
};

export default FileInput;
