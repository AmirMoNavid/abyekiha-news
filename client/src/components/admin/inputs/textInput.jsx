import { useRef } from 'react';
import { BsEye } from 'react-icons/bs';
import Err from '../../err';

const TextInput = ({ name, className, defaultValue, type }) => {
  const inputRef = useRef();

  return (
    <div className={`is-flex ${className}`} style={{ position: 'relative' }}>
      <div style={{ width: '100%' }}>
        <input
          defaultValue={defaultValue}
          ref={inputRef}
          name={name}
          type={type}
          className="input w-full"
        />
        <Err />
      </div>
      {type === 'password' && (
        <span
          className="rounded-[5px] p-2 eye-button"
          onClick={() => {
            const inputType = inputRef.current.type;
            inputRef.current.type = inputType === 'text' ? 'password' : 'text';
          }}
        >
          <BsEye />
        </span>
      )}
    </div>
  );
};

export default TextInput;
