import { useEffect, useRef } from 'react';
import Err from '../../err';

const OptionsInput = ({
  name,
  id,
  options,
  className = '',
  defaultValue = null,
  showEmptyOption = true,
}) => {
  const selectRef = useRef();

  useEffect(() => {
    if (defaultValue) selectRef.current.value = defaultValue;
  }, [defaultValue]);

  return (
    <div>
      <select name={name} ref={selectRef} id={id} className={className}>
        {showEmptyOption && <option value="">انتخاب کنید</option>}
        {options.map((option, index) =>
          option.name == 'گردشگری' || option.name == 'روستا ها'
            ? null
            : option && (
                <option key={index} value={option.id || option.value}>
                  {option.name || option.title}
                </option>
              )
        )}
      </select>
      <Err />
    </div>
  );
};

export default OptionsInput;
