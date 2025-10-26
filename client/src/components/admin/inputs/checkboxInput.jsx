import { useState } from 'react';

const CheckboxInput = ({
  className = '',
  initialState = 0,
  name = '',
  id = '',
  children,
  text,
}) => {
  const [checked, setChecked] = useState(initialState);

  return (
    <label htmlFor={id} className="cursor-pointer f-center-start font-medium">
      <input
        onChange={() => {
          setChecked(checked === 0 ? 1 : 0);
        }}
        checked={Boolean(checked)}
        value={checked}
        name={name}
        id={id}
        type="checkbox"
        className="w-4 h-4 ml-2"
      />
      {children || text}
    </label>
  );
};

export default CheckboxInput;
